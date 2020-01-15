const USER_ACTIONS = 'USER_ACTIONS';

function getPreviousActions() {
  try {
    return JSON.parse(window.localStorage.getItem(USER_ACTIONS));
  } catch (e) {
    return [];
  }
}

function saveAction(action) {
  const previousUserActions = getPreviousActions();
  const actionsJson = JSON.stringify([
    ...previousUserActions,
    action
  ])
  window.localStorage.setItem(USER_ACTIONS, actionsJson);
}

const actionRecorder = store => next => action => {
  saveAction(action);
  return next(action);
};

export default actionRecorder;