import { userKey } from './userStorage';

const BASE_KEY = 'pathlytics_saved_careers';

export interface SavedCareerEntry {
  id: string;
  savedAt: string;
}

function getKey(): string {
  return userKey(BASE_KEY);
}

export function getSavedCareers(): SavedCareerEntry[] {
  try {
    const data = localStorage.getItem(getKey());
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function isCareerSaved(careerId: string): boolean {
  return getSavedCareers().some((c) => c.id === careerId);
}

export function toggleSaveCareer(careerId: string): boolean {
  const key = getKey();
  const saved = getSavedCareers();
  const exists = saved.findIndex((c) => c.id === careerId);
  if (exists >= 0) {
    saved.splice(exists, 1);
    localStorage.setItem(key, JSON.stringify(saved));
    return false;
  } else {
    saved.unshift({ id: careerId, savedAt: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(saved));
    return true;
  }
}

export function removeSavedCareer(careerId: string): void {
  const key = getKey();
  const saved = getSavedCareers().filter((c) => c.id !== careerId);
  localStorage.setItem(key, JSON.stringify(saved));
}
