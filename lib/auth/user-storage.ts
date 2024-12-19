import { StoredUser, User } from '@/lib/types/auth';
import { hashPassword } from '@/lib/auth/password';

/*
 * localStorage-backed mock user database.
 *
 * DEMO ONLY: there is no backend. Records hold a salted password hash, never
 * the password itself (see lib/auth/password.ts).
 */

const USERS_KEY = 'users';

/** Shape written by earlier versions of the app, with a plain-text password. */
type LegacyStoredUser = User & { password?: unknown };
type RawStoredUser = Partial<StoredUser> & LegacyStoredUser;

function readRawUsers(): RawStoredUser[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    return Array.isArray(parsed)
      ? parsed.filter((u) => u !== null && typeof u === 'object')
      : [];
  } catch {
    return [];
  }
}

function hasPlainTextPassword(user: RawStoredUser): boolean {
  return 'password' in user;
}

export function readUsers(): StoredUser[] {
  return readRawUsers() as StoredUser[];
}

export function writeUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function updateStoredUser(
  userId: string,
  changes: Partial<Omit<StoredUser, 'id'>>
): void {
  writeUsers(
    readUsers().map((u) => (u.id === userId ? { ...u, ...changes } : u))
  );
}

/** Strips credentials so they never end up in the persisted session. */
export function toPublicUser(user: User): User {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    addresses: user.addresses ?? [],
    createdAt: user.createdAt,
  };
}

/**
 * Replaces plain-text passwords left by earlier versions with a salted hash.
 * Entries whose `password` is not a usable string are invalidated (the field
 * is dropped and the account can no longer sign in).
 */
export async function migrateLegacyPasswords(): Promise<void> {
  const legacy = readRawUsers().filter(hasPlainTextPassword);
  if (legacy.length === 0) return;

  const hashes = new Map<string, { password: unknown; hash?: StoredUser['passwordHash'] }>();
  await Promise.all(
    legacy.map(async (u) => {
      const hash =
        typeof u.password === 'string' && u.password.length > 0
          ? await hashPassword(u.password)
          : undefined;
      hashes.set(u.id, { password: u.password, hash });
    })
  );

  // Re-read so that writes made while hashing are not lost.
  const users = readRawUsers().map((u) => {
    const entry = hashes.get(u.id);
    if (!hasPlainTextPassword(u) || !entry || entry.password !== u.password) {
      return u;
    }
    const { password: _plainText, ...rest } = u;
    return entry.hash ? { ...rest, passwordHash: entry.hash } : rest;
  });
  writeUsers(users as StoredUser[]);
}

let migration: Promise<void> | null = null;

/** Runs the legacy migration once per page load; retried if it failed. */
export function ensureLegacyPasswordsMigrated(): Promise<void> {
  if (!migration) {
    migration = migrateLegacyPasswords().catch((error) => {
      migration = null;
      throw error;
    });
  }
  return migration;
}
