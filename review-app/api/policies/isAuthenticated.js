var jwt = require('jsonwebtoken');
var moment = require('moment');
module.exports = function(req, res, next) {

    var token = req.headers.authorization ? req.headers.authorization : null;
    if (token === null) {
        return res.forbidden({ "message": 'Please pass the authentication token' });
    }
    var exp = moment(token.exp);
    var decoded = jwt.verify(token, sails.config.scrtKey, function(err, decode) {
        if (decode) {
            return decode;
        } else {
            res.send({
                "message": "Invalid Token"
            })
        }
    });
    if (exp.add('1', 'h') > moment(new Date())) {

        Employees.findOne({ id: decoded.token }).exec(function(error, employee) {
            if (employee) {
                req.decode = decoded;
                next();
            } else {
                res.send({
                    "message": "Invalid token provided"
                });
            }
        })
    } else {
        return res.forbidden({
            message: 'Your Token has expired'
        });
    }
}