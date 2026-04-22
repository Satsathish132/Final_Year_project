/**
 * Get the current user's unique ID for scoping localStorage data.
 * Falls back to 'guest' if no user is logged in.
 */
export function getCurrentUserId(): string {
  try {
    const raw = localStorage.getItem('pathlytics_user');
    if (raw) {
      const user = JSON.parse(raw);
      // Use email as unique key (sanitized)
      return user.email?.replace(/[^a-zA-Z0-9]/g, '_') || 'guest';
    }
  } catch {}
  return 'guest';
}

/**
 * Build a user-scoped localStorage key.
 */
export function userKey(baseKey: string): string {
  return `${baseKey}_${getCurrentUserId()}`;
}
