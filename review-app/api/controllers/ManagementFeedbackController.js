/**
 * ManagementFeedbackController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    create: (req, res) => {
        var requestData = req.decode.token;
        var Joi = require('joi');
        Joi.validate(req.body, {
            feedBackFrom: Joi.string().required(),
            message: Joi.string().required(),
        }, async(error) => {
            if (error) {
                return res.badRequest({
                    message: error.details[0].message
                });
            }

            try {
                requestData.name = requestData.name.toLowerCase();
                var feedBack = await ManagementFeedback.create(requestData).fetch()
                return res.ok({
                    "feedBack": feedBack,
                });
            } catch (err) {
                return res.serverError({
                    message: "server Error"
                });
            }
        })
    },
    getFeedBack: (req, res) => {
        try {
            Employees.find().exec(function(err, feedBackMgmt) {
                if (err) {
                    return res.serverError("Database error");
                }
                if (feedBackMgmt.length > 0) {
                    delete feedBackMgmt('feedBackFrom');
                    return res.ok({
                        "data": feedBackMgmt
                    })
                } else {
                    return res.ok({
                        "data": "No FeedBack"
                    })
                }
            });
        } catch (err) {
            return res.serverError({
                message: "Database Error"
            });
        }
    }
};