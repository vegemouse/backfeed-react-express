import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    if (this.props.surveys.length > 0) {
      return this.props.surveys.reverse().map(survey => {
        return (
          <div className="card teal" key="survey._id">
            <div className="card-content white-text">
              <span className="card-title">{survey.title}</span>
              <p>
                {survey.body}
              </p>
              <p className="right">
                Sent On: {new Date(survey.dateSent).toLocaleDateString()}
              </p>
            </div>
            <div className="card-action teal darken-2">
              <a className="yellow-text text-darken-2">Yes: {survey.yes}</a>
              <a className="yellow-text text-darken-2">No: {survey.no}</a>
            </div>
          </div>
        );
      });
    } else {
      return (
        <h3 className="center-align grey-text">
          <br />
          You don't have any surveys currently. To make a new survey, press the <strong>+</strong> button below.
        </h3>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderSurveys()}
      </div>
    )
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
