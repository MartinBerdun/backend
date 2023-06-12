const checkLogin = (req, res, next) => {
    if (!req.session.user) return res.redirect("/");
    next();
}

const checkLogged = (req, res, next) => {
    if (req.session.user) return res.redirect("/products");
    console.log(req.session.user);
    next();

}

const authRole = (req, res, next, roleToVerify) => {
    // const  role  = "holi";
    // console.log({role});
    const {role} = req.session.user;

    if (role !== roleToVerify)
        return res.status(403).send({ status: "error", error: "Unauthorized" });

    next();
};

// function authRole(roles) {
//     return (req, res, next) => {
//         const currentUser = req.session.user;
//         console.log(currentUser);
//         const hasPermission = roles.some(role => currentUser.rol=== role);
//         if(!hasPermission) return res.status(403).send({ status: "error", error: "Unauthorized" });

//         next();
//     }
// }
export { checkLogged, checkLogin , authRole};