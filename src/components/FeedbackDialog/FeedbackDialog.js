import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
  toggleFeedback,
  feedbackSubmit
} from '../../store/actionCreators';
import './FeedbackDialog.css';

function validate(formValues) {
  const errors = {};
  if (!formValues.name) {
    errors.name = 'Missing name';
  }
  if (!formValues.email) {
    errors.email = 'Missing email';
  }
  if (!formValues.feedback) {
    errors.feedback = 'Missing feedback';
  }
  return Object.keys(errors).length > 0 ? errors : null;
}

function FeedbackDialog(props) {
  const { feedbackVisible, onDialogClose, onFormSubmit } = props;

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [feedback, setFeedback] = React.useState('');
  const [errors, setErrors] = React.useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const timeString = (new Date()).toString();
    const formValues = { name, email, feedback, timeString };
    const errors = validate(formValues);

    if (errors) {
      setErrors(errors);
    } else {
      setErrors({});
      onFormSubmit(formValues);
    }
  };

  return (
    <Dialog open={feedbackVisible} onClose={onDialogClose}>
      <form onSubmit={handleSubmit} noValidate className="FeedbackDialog-form">
        <TextField label="name" value={name} onChange={e => setName(e.target.value)} />
        {errors.name ? <p>{errors.name}</p> : null}

        <TextField type="email" label="email" value={email} onChange={e => setEmail(e.target.value)} />
        {errors.email ? <p>{errors.email}</p> : null}

        <TextField
          label="Feedback"
          multiline
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
        />
        {errors.feedback ? <p>{errors.feedback}</p> : null}

        <Button type="submit">Submit</Button>
      </form>
    </Dialog>
  );
}

function mapStateToProps(state) {
  return { feedbackVisible: state.feedbackVisible };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onDialogClose: () => dispatch(toggleFeedback()),
    onFormSubmit: (feedback) => dispatch(feedbackSubmit(feedback)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackDialog);