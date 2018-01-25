import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return <Field
        key={name}
        component={SurveyField}
        type="text"
        label={label}
        name={name}
      />
    });
  }
  render() {
    return (
      <div>
        <p>Please fill out the form to create a new survey. You will be asked to verify this information on the next page.</p>
        <form
        onSubmit={this.props.handleSubmit( this.props.onSurveySubmit)}
        >
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text lighten-2">
            Cancel
          </Link>
          <button className="btn teal btn-flat white-text right lighten-2" type="submit">
            Next
            <i className="material-icons right">navigate_next</i>
          </button>
        </form>
      </div>
    );
  };
}

function validate(values) {
  const errors = {};
  errors.recipients = validateEmails(values.emails || '');

  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
