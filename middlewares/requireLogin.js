module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status.send({ error: 'You must log in.'})
  } else {
    next();
  }
};
