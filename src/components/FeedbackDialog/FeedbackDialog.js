import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
  toggleFeedback,
  feedbackSubmit
} from '../../store/actionCreators';
import { Form, Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import './FeedbackDialog.css';

const schema  = yup.object().shape({
  name: yup.string().required('Please enter your name'),
  email: yup.string().email().required('Please enter your email'),
  feedback: yup.string().min(5, 'Please enter a move detailed feedback')
});

function FeedbackDialog(props) {
  const { feedbackVisible, onDialogClose, onFormSubmit } = props;

  const handleSubmit = (formValues) => {
    const timeString = (new Date()).toString();
    onFormSubmit({ ...formValues, timeString });
  };

  const initialValues = {
    name: '',
    email: '',
    feedback: ''
  }

  return (
    <Dialog open={feedbackVisible} onClose={onDialogClose}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ handleSubmit, handleBlur, handleChange, values, errors, touched, isSubmitting }) => (
          <Form onSubmit={handleSubmit} noValidate className="FeedbackDialog-form">
            <TextField
              type="name"
              name="name"
              label="name"
              value={values.name}
              onChange={handleChange} onBlur={handleBlur} />
            <ErrorMessage name="name" />

            <TextField
              type="email"
              name="email"
              label="email"
              value={values.email}
              onChange={handleChange} onBlur={handleBlur} />
            <ErrorMessage name="email" />

            <TextField
              label="Feedback"
              name="feedback"
              multiline
              value={values.feedback}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorMessage name="feedback" />

            <Button disabled={isSubmitting} type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
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