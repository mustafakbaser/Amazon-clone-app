import { PasswordHash } from '@/lib/types/auth';

/*
 * Password hashing for the client-side mock auth.
 *
 * DEMO ONLY: this app has no backend. Accounts live in the browser's
 * localStorage, where anyone with access to the device can read or edit them.
 * Hashing only guarantees that the password itself is never written to
 * storage. A real app must create sessions and verify passwords on a server.
 */

/** OWASP (2023) recommendation for PBKDF2-HMAC-SHA256. */
export const PBKDF2_ITERATIONS = 600000;
const SALT_BYTES = 16;
const HASH_BITS = 256;

function getCrypto(): Crypto {
  const webCrypto = typeof globalThis !== 'undefined' ? globalThis.crypto : undefined;
  if (!webCrypto || !webCrypto.subtle) {
    // crypto.subtle only exists in secure contexts (HTTPS or localhost).
    throw new Error('Web Crypto API is not available');
  }
  return webCrypto;
}

function toBase64(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function fromBase64(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function derive(
  password: string,
  salt: Uint8Array,
  iterations: number
): Promise<Uint8Array> {
  const { subtle } = getCrypto();
  const key = await subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const bits = await subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations },
    key,
    HASH_BITS
  );
  return new Uint8Array(bits);
}

/** Compares without exiting early on the first differing byte. */
function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a[i] ^ b[i];
  }
  return diff === 0;
}

/** Hashes a password with a fresh random salt. */
export async function hashPassword(
  password: string,
  iterations: number = PBKDF2_ITERATIONS
): Promise<PasswordHash> {
  const salt = getCrypto().getRandomValues(new Uint8Array(SALT_BYTES));
  const hash = await derive(password, salt, iterations);
  return {
    algorithm: 'PBKDF2-SHA-256',
    iterations,
    salt: toBase64(salt),
    hash: toBase64(hash),
  };
}

/** Re-derives the hash with the stored salt and iteration count and compares. */
export async function verifyPassword(
  password: string,
  stored: PasswordHash
): Promise<boolean> {
  if (
    !stored ||
    stored.algorithm !== 'PBKDF2-SHA-256' ||
    !Number.isInteger(stored.iterations) ||
    stored.iterations < 1
  ) {
    return false;
  }

  let salt: Uint8Array;
  let expected: Uint8Array;
  try {
    salt = fromBase64(stored.salt);
    expected = fromBase64(stored.hash);
  } catch {
    return false;
  }

  const actual = await derive(password, salt, stored.iterations);
  return constantTimeEqual(actual, expected);
}
