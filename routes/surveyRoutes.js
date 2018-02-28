const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('<h1 style="text-align: center;">Thanks so much for your feedback!</h1>');
  })

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
      .map(({email, url}) => { // get email and url from event object
        const match = p.test(new URL(url).pathname); // Checks if pathname has user's email, surveyId and choice
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact() // removes undefined
      .uniqBy('email', 'surveyId') // removes duplicates
      .each(({ surveyId, email, choice}) => {
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false } // Finds subdoc collection
          }
        }, {
          $inc: { [choice]: 1 }, // increment yes or no ([choice]) by 1
          $set: { 'recipients.$.responded': true }, // $ matches to elemMatch above
          lastResponded: new Date()
        }).exec(); // executes query
      })
      .value(); // returns new array

    res.send({}); // don't leave sendgrid hanging
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422)
    }

  });
};
