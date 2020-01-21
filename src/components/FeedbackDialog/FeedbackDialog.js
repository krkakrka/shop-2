import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import {
  toggleFeedback
} from '../../store/actionCreators';

function FeedbackDialog(props) {
  const { feedbackVisible, onDialogClose } = props;
  return (
    <Dialog open={feedbackVisible} onClose={onDialogClose}>
      DIALOG
    </Dialog>
  );
}

function mapStateToProps(state) {
  return { feedbackVisible: state.feedbackVisible };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onDialogClose: () => dispatch(toggleFeedback()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackDialog);