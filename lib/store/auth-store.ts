import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  User,
  StoredUser,
  LoginCredentials,
  RegisterData,
  Address,
} from '@/lib/types/auth';
import { generateId } from '@/lib/utils';
import { hashPassword, verifyPassword } from '@/lib/auth/password';
import {
  ensureLegacyPasswordsMigrated,
  readUsers,
  toPublicUser,
  updateStoredUser,
  writeUsers,
} from '@/lib/auth/user-storage';

/*
 * Client-only mock authentication. DEMO ONLY: there is no backend, accounts
 * are kept in localStorage and the session below is persisted by zustand.
 * Passwords are never stored, only a salted PBKDF2 hash (lib/auth/password.ts).
 */

interface AuthStore {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<User>;
  register: (data: RegisterData) => Promise<User>;
  logout: () => void;
  addAddress: (address: Omit<Address, 'id' | 'isDefault'>) => void;
  updateAddress: (address: Address) => void;
  removeAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => {
      const saveAddresses = (addresses: Address[]) => {
        const { user } = get();
        if (!user) return;

        set({ user: { ...user, addresses } });
        updateStoredUser(user.id, { addresses });
      };

      return {
        user: null,
        login: async (credentials) => {
          await ensureLegacyPasswordsMigrated();
          const record = readUsers().find((u) => u.email === credentials.email);

          const isValid =
            !!record?.passwordHash &&
            (await verifyPassword(credentials.password, record.passwordHash));

          if (!record || !isValid) {
            throw new Error('Invalid credentials');
          }

          const user = toPublicUser(record);
          set({ user });
          return user;
        },
        register: async (data) => {
          await ensureLegacyPasswordsMigrated();
          const emailTaken = () =>
            readUsers().some((u) => u.email === data.email);

          if (emailTaken()) {
            throw new Error('Email already exists');
          }

          const passwordHash = await hashPassword(data.password);

          // Hashing is async, so check again before writing.
          if (emailTaken()) {
            throw new Error('Email already exists');
          }

          const newUser: StoredUser = {
            id: generateId(),
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            addresses: [],
            createdAt: new Date().toISOString(),
            passwordHash,
          };

          writeUsers([...readUsers(), newUser]);

          const user = toPublicUser(newUser);
          set({ user });
          return user;
        },
        logout: () => {
          set({ user: null });
        },
        addAddress: (addressData) => {
          const { user } = get();
          if (!user) return;

          const newAddress: Address = {
            ...addressData,
            id: generateId(),
            isDefault: user.addresses.length === 0,
          };
          saveAddresses([...user.addresses, newAddress]);
        },
        updateAddress: (address) => {
          const { user } = get();
          if (!user) return;

          saveAddresses(
            user.addresses.map((a) => (a.id === address.id ? address : a))
          );
        },
        removeAddress: (addressId) => {
          const { user } = get();
          if (!user) return;

          saveAddresses(user.addresses.filter((a) => a.id !== addressId));
        },
        setDefaultAddress: (addressId) => {
          const { user } = get();
          if (!user) return;

          saveAddresses(
            user.addresses.map((a) => ({
              ...a,
              isDefault: a.id === addressId,
            }))
          );
        },
      };
    },
    {
      name: 'auth-storage',
      // v0 persisted the full user record, including the plain-text password.
      version: 1,
      migrate: (persistedState, version) => {
        const state = (persistedState ?? {}) as { user?: User | null };
        if (version < 1 && state.user) {
          return { ...state, user: toPublicUser(state.user) };
        }
        return state;
      },
      partialize: (state) => ({
        user: state.user ? toPublicUser(state.user) : null,
      }),
      onRehydrateStorage: () => () => {
        // Hash any plain-text passwords left in the user list by older versions.
        ensureLegacyPasswordsMigrated().catch(() => {
          // Retried on the next login or registration.
        });
      },
    }
  )
);
