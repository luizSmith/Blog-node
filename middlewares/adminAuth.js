function adminAuth(req, resp, next) {
    if (req.session.user != undefined) {
        next();
    } else {
        resp.redirect("/login");
    }
}

module.exports = adminAuth;