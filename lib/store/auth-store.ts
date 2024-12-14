import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginCredentials, RegisterData, Address } from '@/lib/types/auth';
import { generateId } from '@/lib/utils';

interface AuthStore {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<User>;
  register: (data: RegisterData) => Promise<User>;
  logout: () => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (address: Address) => void;
  removeAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      login: async (credentials) => {
        // Simulate API call
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(
          (u: User) =>
            u.email === credentials.email && u.password === credentials.password
        );

        if (!user) {
          throw new Error('Invalid credentials');
        }

        set({ user });
        return user;
      },
      register: async (data) => {
        // Simulate API call
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (users.some((u: User) => u.email === data.email)) {
          throw new Error('Email already exists');
        }

        const newUser: User = {
          id: generateId(),
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          addresses: [],
          createdAt: new Date().toISOString(),
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        set({ user: newUser });
        return newUser;
      },
      logout: () => {
        set({ user: null });
      },
      addAddress: (addressData) => {
        set((state) => {
          if (!state.user) return state;

          const newAddress: Address = {
            ...addressData,
            id: generateId(),
            isDefault: state.user.addresses.length === 0,
          };

          const updatedUser = {
            ...state.user,
            addresses: [...state.user.addresses, newAddress],
          };

          // Update in localStorage
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const updatedUsers = users.map((u: User) =>
            u.id === state.user?.id ? updatedUser : u
          );
          localStorage.setItem('users', JSON.stringify(updatedUsers));

          return { user: updatedUser };
        });
      },
      updateAddress: (address) => {
        set((state) => {
          if (!state.user) return state;

          const updatedUser = {
            ...state.user,
            addresses: state.user.addresses.map((a) =>
              a.id === address.id ? address : a
            ),
          };

          // Update in localStorage
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const updatedUsers = users.map((u: User) =>
            u.id === state.user?.id ? updatedUser : u
          );
          localStorage.setItem('users', JSON.stringify(updatedUsers));

          return { user: updatedUser };
        });
      },
      removeAddress: (addressId) => {
        set((state) => {
          if (!state.user) return state;

          const updatedUser = {
            ...state.user,
            addresses: state.user.addresses.filter((a) => a.id !== addressId),
          };

          // Update in localStorage
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const updatedUsers = users.map((u: User) =>
            u.id === state.user?.id ? updatedUser : u
          );
          localStorage.setItem('users', JSON.stringify(updatedUsers));

          return { user: updatedUser };
        });
      },
      setDefaultAddress: (addressId) => {
        set((state) => {
          if (!state.user) return state;

          const updatedUser = {
            ...state.user,
            addresses: state.user.addresses.map((a) => ({
              ...a,
              isDefault: a.id === addressId,
            })),
          };

          // Update in localStorage
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const updatedUsers = users.map((u: User) =>
            u.id === state.user?.id ? updatedUser : u
          );
          localStorage.setItem('users', JSON.stringify(updatedUsers));

          return { user: updatedUser };
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);