module.exports = {
  loggingMiddleware(req, res, next) {
    console.log('Here is the users ip:', req.ip);
    next();
  },
};
