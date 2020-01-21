import {
  TOGGLE_USER_FEEDBACK_DIALOG
} from '../actionTypes';

export default function feedbackVisibleReducer(feedbackVisible = false, action) {
  switch(action.type) {
    case TOGGLE_USER_FEEDBACK_DIALOG:
      return !feedbackVisible;
    default:
      return feedbackVisible;
  }
}
