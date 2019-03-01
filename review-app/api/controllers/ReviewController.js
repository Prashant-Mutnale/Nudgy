/**
 * ReviewController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var moment = require('moment');
module.exports = {
    /**
        * Creates a new employee .
        *
        * @param {object} req The request object
        * @param {object} res The response object
        * @author Sandeep Rao <sandeep@appinessworld.com>
        *
        * @api 			{post} /employees
        * @apiVersion 		1.0.0
        * @apiName 		Create
        * @apiGroup 		Employee
        * @apiHeader       {String} Content-Type application/json , authorization:access-token from the login Api'
        *
        * @apiPermission 	none
        * @apiHeader       {String} Content-Type application/json
        * @apiParam        {String} email The email address of the new employee
        * @apiParam        {String} name The name of the new employee
        * @apiParam        {String} contactNo The new employee phone number
        * @apiParam        {String} designation The new employee designation
        * @apiParam        {String} role The new employee’s role 
        * @apiParam        {String} organization The new employee’s belongsTo which organization
        * @apiParam        {String} password The new employee’s password
        * @apiParam        {String} isPasswordSet Is the new employee's reset his/her password after registeration
        
        * @apiParamExample {json} Request-Example:
        *      {
        *          "reviewMessage": "Foo",
        *          "reviewer": "sandeep@appinessworld",
        *          "rating": "+14157778888",
        *          "reviewTo":"admin",
        *      }
        */
    create: (req, res) => {

        var requestData = req.body;
        var Joi = require('joi');
        Joi.validate(req.body, {
            reviewMessage: Joi.string().required(),
            reviewTo: Joi.string().required(),
            employeeRating: Joi.object().keys({
                behavior: Joi.string().required(),
                skillLevel: Joi.string().required(),
                communication: Joi.string().required(),
                dependability: Joi.string().required()
            }).required(),
            projectId: Joi.string().required(),
            type: Joi.string().required(),
            hrRating: Joi.object().keys({
                workCulture: Joi.string()
            }),
        }, async(error) => {
            var behavior = 0;
            var skillLevel = 0;
            var communication = 0;
            var dependability = 0;
            if (error) {
                return res.badRequest({
                    message: error.details[0].message
                });
            }
            requestData.reviewBy = req.decode.token;
            var rating = ((parseInt(requestData.employeeRating.behavior) + parseInt(requestData.employeeRating.skillLevel) + parseInt(requestData.employeeRating.communication) + parseInt(requestData.employeeRating.dependability)) / 4);
            if (rating < 3) {
                requestData.status = "waiting_for_approve";
            }
            try {
                await Projects.findOne({ id: req.body.projectId }).exec(async(err, projectData) => {
                    if (err) {
                        return res.ok({
                            'message': 'User is not in your project anymore'
                        })
                    }
                    await Review.findOne({ 'reviewBy': req.decode.token, 'reviewTo': requestData.reviewTo }).exec(async(err, listData) => {
                        if (!listData) {
                            var review = await Review.create(requestData).fetch();

                            return res.ok({
                                "review": review,
                            });
                        } else {
                            return res.ok({
                                'message': 'You have already reviewed this member'
                            })
                        }
                    });
                })
            } catch (err) {
                return res.serverError({
                    message: "Sever Error"
                });
            }
        })
    },
    getAllReview: async(req, res) => {

        try {
            await Review.find().populate('reviewTo').sort(['type DESC', 'createdAt DESC']).exec((err, reviewList) => {

                if (err) {
                    return res.serverError({
                        "message": "Server error"
                    })
                }
                if (reviewList) {
                    return res.ok({
                        "data": reviewList
                    })
                }
                return res.ok({
                    "data": []
                })

            })
        } catch (err) {
            return res.serverError({
                message: "Database Error"
            });
        }
    },
    getEmployeeReview: async(req, res) => {
        //var presentDate = moment(new Date(),"DD");
        //  if(presentDate<28)
        //  {
        //   return res.ok({
        //     "data": "Not allowed to write review before 28th"
        //   })
        // }
        //var FirstDate = moment().subtract(1, 'months').startOf('month').tz("Europe/Paris").format();
        //var LastDate  =  moment().subtract(1, 'months').endOf('month').tz("Europe/Paris").format();
        var FirstDate = "";
        var LastDate = "";
        if (req.params.type === "last") {
            FirstDate = moment().subtract(5, 'days').valueOf();
            LastDate = moment().subtract(2, 'days').valueOf();
        } else {
            FirstDate = moment().subtract(2, 'days').valueOf();
            LastDate = moment().valueOf();
        }
        try {
            await Review.find({ reviewTo: req.params.id, 'type': 'review', "createdAt": { '>': FirstDate, '<': LastDate } }).populate('reviewTo').exec(async(err, reviewList) => {
                //  try{    
                //   await Review.find({reviewTo:req.params.id}).exec((err,reviewList)=>{

                if (err) {
                    return res.serverError({
                        "message": "Server error"
                    })
                }

                if (reviewList) {
                    return res.ok({
                        "data": reviewList
                    })

                } else {
                    return res.ok({
                        "data": []
                    })
                }
            })
        } catch (err) {
            return res.serverError({
                message: "Database Error"
            });
        }
    },
    hallOfFame: async(req, res) => {
        var hallOfFameData = [];
        var LastDate = "";
        if (req.params.type === "last") {
            FirstDate = moment().subtract(5, 'days').valueOf();
            LastDate = moment().subtract(2, 'days').valueOf();
        } else {
            FirstDate = moment().subtract(2, 'days').valueOf();
            LastDate = moment().valueOf();
        }
        await Review.find({ type: 'review', "createdAt": { '>': FirstDate, '<': LastDate } }).exec((error, reviews) => {
            if (error) {
                sails.log.error(error);
                return res.serverError();
            }
            if (reviews.length) {
                var reviewerId = [];
                for (let i = 0; i < reviews.length; i++) {
                    reviewerId.push(reviews[i].reviewTo);
                }
                let uniqEmp = _.uniq(reviewerId);

                var async = require('async');
                async.each(uniqEmp, async(empId, callback) => {
                    let behavior = 0;
                    let skillLevel = 0;
                    let communication = 0;
                    let dependability = 0;

                    await Review.find({ 'reviewTo': empId, type: 'review' }).populate('reviewTo').exec(async(err, reviewList) => {
                        if (err) {
                            sails.log.error(error);
                            return res.serverError();
                        }
                        reviewList.map((item) => {
                            behavior = behavior + parseInt(item.employeeRating.behavior);
                            skillLevel = skillLevel + parseInt(item.employeeRating.skillLevel);
                            communication = communication + parseInt(item.employeeRating.communication);
                            dependability = dependability + parseInt(item.employeeRating.dependability);
                        })
                        let overAllRating = {
                            'behavior': (behavior / reviewList.length),
                            'skillLevel': (skillLevel / reviewList.length),
                            'communication': (communication / reviewList.length),
                            'dependability': (dependability / reviewList.length)
                        }
                        let finalRatings = ((overAllRating.behavior + overAllRating.skillLevel + overAllRating.communication + overAllRating.dependability) / 4).toString();
                        console.log('reviewList[0].reviewTo', reviewList[0].reviewTo);
                        if (reviewList[0].reviewTo) {
                            let finalObj = {
                                'finalRating': finalRatings,
                                'noOfReviews': reviewList.length,
                                'name': reviewList[0].reviewTo.name
                            }
                            hallOfFameData.push(finalObj);
                        }
                        callback();
                    })
                    console.log('hallOfFameData', hallOfFameData);
                }, error => {
                    if (error) {
                        sail.log.error(error);
                        return res.serverError("Database error");
                    }

                    function sortByKey(array, key) {
                        return array.sort(function(a, b) {
                            var x = a[key];
                            var y = b[key];
                            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                        });
                    }
                    hallOfFameData = sortByKey(hallOfFameData, 'finalRating')
                    return res.ok({
                        'hallOfFame': hallOfFameData
                    })
                })
            } else {
                return res.ok({
                    'message': 'No Data is Present'
                })
            }
        })
    },

    shoutOut: async(req, res) => {
        var requestData = req.body;
        var Joi = require('joi');
        Joi.validate(req.body, {
            reviewMessage: Joi.string().required(),
            shoutOutRating: Joi.string().required(),
            projectId: Joi.string().required(),
            type: Joi.string().required(),
            reviewTo: Joi.string().required(),

        }, async(error) => {

            if (error) {
                return res.badRequest({
                    message: error.details[0].message
                });
            }
            if (parseInt(req.body.shoutOutRating) < 3) {
                requestData.status = "waiting_for_approve";
            }
            requestData.reviewBy = req.decode.token;
            try {
                await Projects.findOne({ id: req.body.projectId }).exec(async(err, projectData) => {

                    await Review.findOne({ 'reviewBy': req.decode.token, 'reviewTo': requestData.reviewTo, 'type': 'shoutOut' }).exec(async(err, listData) => {
                        if (!listData) {
                            var review = await Review.create(requestData).fetch();

                            return res.ok({
                                "review": review,
                            });
                        } else {
                            return res.ok({
                                'message': 'You have already reviewed this member'
                            })
                        }
                    });
                })
            } catch (err) {
                return res.serverError({
                    message: "Sever Error"
                });
            }
        })
    },
    hrRating: (req, res) => {
        var FirstDate = moment().subtract(10, 'days').valueOf();
        var LastDate = moment().valueOf();
        var requestData = req.body;
        var Joi = require('joi');
        Joi.validate(req.body, {
            type: Joi.string().required(),
            reviewTo: Joi.string().required(),
            hrRating: Joi.object().keys({
                workCulture: Joi.string().required(),
                absenteeism: Joi.string().required(),
                punctuality: Joi.string().required(),
            }).required(),

        }, async(error) => {

            if (error) {
                return res.badRequest({
                    message: error.details[0].message
                });
            }

            // var rating = (parseInt(requestData.employeeRating.behavior) + parseInt(requestData.employeeRating.skillLevel) + parseInt(requestData.employeeRating.communication) + parseInt(requestData.employeeRating.dependability) / 4);
            // if (rating < 3) {
            //     requestData.status = "waiting_for_approve";
            // }
            try {
                await Review.findOne({ 'reviewTo': req.body.reviewTo, type: 'review', "createdAt": { '>': FirstDate, '<': LastDate } }).exec(async(err, listData) => {
                    if (listData) {
                        if (!listData.hrRating) {
                            var review = await Review.update({ 'reviewTo': req.body.reviewTo }, requestData).fetch();
                            return res.ok({
                                "review": review,
                            });
                        } else {
                            return res.ok({
                                "message": "You have already reviewed this person"
                            })
                        }
                    } else {
                        var hrReview = await Review.create(requestData).fetch();
                        return res.ok({
                            "review": hrReview,
                        })
                    }
                });

            } catch (err) {
                return res.serverError({
                    message: "Sever Error"
                });
            }
        })
    }
}