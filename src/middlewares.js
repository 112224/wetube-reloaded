export const localMiddleware =(req, res, next) =>{
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    console.log('res :>> ', res.locals);
    res.locals.loggedInUser = req.session.user;
    next();
}