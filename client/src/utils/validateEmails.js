import _ from 'lodash';

const regEx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default (emails) => {
  let invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => regEx.test(email || email+',') === false);

  invalidEmails = _.compact(invalidEmails);

  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails} `;
  }

  return;
};
