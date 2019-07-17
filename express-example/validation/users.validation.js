module.exports.postCreate = function(req, res, next) {
    let errors = [];
    if (!req.body.name) {
        errors.push("Name is required!")
    }

    if (!req.body.phone) {
        errors.push("Phone is required!")
    } else if (req.body.phone.match(/((09|03|07|08|05)+([0-9]{8})\b)/g) === null) {
        errors.push("Phone is invalid")
    }

    if (errors.length) {
        res.render("users/create", {
            errors: errors,
            values: req.body
        })
        return;
    };
    next();
}