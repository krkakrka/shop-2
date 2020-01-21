import {
  TOGGLE_USER_FEEDBACK_DIALOG,
  FEEDBACK_SUBMITED
} from '../actionTypes';

export default function feedbackVisibleReducer(feedbackVisible = false, action) {
  switch(action.type) {
    case TOGGLE_USER_FEEDBACK_DIALOG:
      return !feedbackVisible;
    case FEEDBACK_SUBMITED:
      return false;
    default:
      return feedbackVisible;
  }
}
