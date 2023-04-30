const checkLogin = (req, res, next) => {
    if (!req.session.user) return res.redirect("/");
    next();
}

const checkLogged = (req, res, next) => {
    if (req.session.user) return res.redirect("/products");
    next();
}

export { checkLogged, checkLogin };