const CORRECT_HASH = 'b6bb294d93a57986013c4c18d7a47b1da9dca9b1eab0798ac9aeb57cda15b90a';
const STORAGE_KEY = 'atlas-auth';

async function sha256(text: string): Promise<string> {
  const buffer = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export function isAuthenticated(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'unlocked';
  } catch {
    return false;
  }
}

export async function authenticate(input: string): Promise<boolean> {
  const hash = await sha256(input);
  if (hash === CORRECT_HASH) {
    try { localStorage.setItem(STORAGE_KEY, 'unlocked'); } catch {}
    return true;
  }
  return false;
}

export function logout(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}
