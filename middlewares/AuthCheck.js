var jwt = require('jsonwebtoken');

const authCheck = (req, res, next) => {

    const token = req.body.token;

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    } catch (error) {
        return res.json({
            status: false,
            message: "Token is not valid"
        })
    }
}

module.exports = authCheck;