export const localMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user;
  console.log("req.session.user :>> ", req.session.user);
  next();
};
export const protectorMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return res.redirect("/");
  }
  next();
};
export const publicOnlyMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return res.redirect("/");
  }
  next();
};
