module.exports = function(req, res, next) {

    if (req.decode.role !== 'admin') {
        res.send({
            "message": "Only Admin can authorized to update user"
        });
    }
    next();
}