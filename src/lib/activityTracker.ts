import { userKey } from './userStorage';

export interface Activity {
  action: string;
  item: string;
  time: string; // ISO string
}

const BASE_KEY = 'pathlytics_activity';
const MAX_ACTIVITIES = 10;

function getKey(): string {
  return userKey(BASE_KEY);
}

export const trackActivity = (action: string, item: string) => {
  const key = getKey();
  const activities = getActivities();
  activities.unshift({ action, item, time: new Date().toISOString() });
  localStorage.setItem(key, JSON.stringify(activities.slice(0, MAX_ACTIVITIES)));
};

export const getActivities = (): Activity[] => {
  try {
    return JSON.parse(localStorage.getItem(getKey()) || '[]');
  } catch {
    return [];
  }
};

export const formatTimeAgo = (isoString: string): string => {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
};
