export const localsMiddlewares = (req, res, next) => {
  res.locals.siteName = 'Youtube';
  res.locals.loggedIn = !!req.session.loggedIn;
  res.locals.loggedInUser = req.session.user;
  next();
};
