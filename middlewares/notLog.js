function notLog(req, resp, next) {
    if (req.session.user != undefined) {        
        resp.redirect("/admin/categories");
    } else {
        next();
    }
}

module.exports = notLog;