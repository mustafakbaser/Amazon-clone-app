/** Public profile kept in the session. Never contains credentials. */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  addresses: Address[];
  createdAt: string;
}

/**
 * Salted PBKDF2 hash: the only form in which a password is persisted.
 * `salt` and `hash` are base64 encoded.
 */
export interface PasswordHash {
  algorithm: 'PBKDF2-SHA-256';
  iterations: number;
  salt: string;
  hash: string;
}

/**
 * Account record in the localStorage-backed mock user database.
 * This is a demo without a backend, see lib/auth/password.ts.
 */
export interface StoredUser extends User {
  passwordHash: PasswordHash;
}

export interface Address {
  id: string;
  title: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  zipCode: string;
  isDefault: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}