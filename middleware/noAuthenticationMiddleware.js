const noAuthenticationMiddleware = (req, res, next) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    next();
  }
};

module.exports = noAuthenticationMiddleware;
