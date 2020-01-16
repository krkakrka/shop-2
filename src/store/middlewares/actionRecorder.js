const USER_ACTIONS = 'USER_ACTIONS';

function getPreviousActions() {
  const userActionsStr = window.localStorage.getItem(USER_ACTIONS);
  return JSON.parse(userActionsStr) || [];
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