import {
  FEEDBACK_SUBMITED
} from '../actionTypes';

export default function userFeedbackReducer(userFeedback = [], action) {
  switch(action.type) {
    case FEEDBACK_SUBMITED:
      return userFeedback.concat(action.feedback);
    default:
      return userFeedback;
  }
}
