const APP_STATE = 'APP_STATE';

export function cacheStateToLocalStorage(state) {
  // todo handle low space
  window.localStorage.setItem(APP_STATE, JSON.stringify(state));
}

export function getCachedStateFromLocalStorate() {
  const appStateStr = window.localStorage.getItem(APP_STATE);
  try {
    return JSON.parse(appStateStr) || undefined;
  } catch (e) {
    return;
  }
}