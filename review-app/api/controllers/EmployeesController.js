/**
 * EmployeesController
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
         *          "name": "Foo",
         *          "email": "sandeep@appinessworld",
         *          "contactNo": "+14157778888",
         *          "role":"admin",
         *          "designation":"developer",
         *          "organization":"organization id",
         *          "password":"employee Password",
         *          "isPasswordSet":"false"
         *      }
         */
    create: (req, res) => {
        var jwt = require('jsonwebtoken');
        var requestData = req.body;
        var Joi = require('joi');
        Joi.validate(req.body, {
            name: Joi.string().required(),
            email: Joi.string().email(),
            password: Joi.string().required(),
            organization: Joi.string().required(),
            designation: Joi.string(),
            isPasswordSet: Joi.string(),
            role: Joi.string(),
            contactNo: Joi.string().max(10),

        }, async(error) => {

            if (error) {
                return res.badRequest({
                    message: error.details[0].message
                });
            }

            try {
                requestData.name = requestData.name.toLowerCase();
                var employees = await Employees.create(requestData).fetch()
                var access_token = jwt.sign({
                    exp: Date.now(),
                    token: employees.id,
                    type: employees.role,
                    password: employees.isPasswordSet
                }, sails.config.scrtKey);
                return res.ok({
                    "employees": employees,
                    "access_token": access_token
                });
            } catch (err) {
                sails.log(err);
                if (err.code === 'E_UNIQUE') {
                    return res.serverError({
                        message: "Either email or contactNo already exists in database"
                    });
                } else {
                    return res.serverError({
                        message: "server Error"
                    });
                }

            }

        })
    },
    /**
     * Returns a data of login Employee
     *
     * @param {object} req The request object
     * @param {object} res The response object
     * @author Sandeep <sandeep@appinessworld.com>
     *
     * @api 			{post} /employees/signIn 
     * @apiVersion 		1.0.0
     * @apiName 		  Login Employee
     * @apiGroup 		  Employee
     * @apiDescription  Returns information of Login Employee
     *
     * @apiPermission 	none
     * @apiHeader       {String} Content-Type application/json
     * @apiParam        {String} email The email address of the new employee
     * @apiParam        {String} password The new employee’s password
     * @apiParamExample {json} Request-Example:
     *      {
     *         "email": "sandeep@appinessworld",
     *         "password":"saurav12"
     *      }
     */

    signIn: (req, res) => {
        var jwt = require('jsonwebtoken');
        var bcrypt = require('bcryptjs');
        var Joi = require('joi');
        Joi.validate(req.body, {
            email: Joi.string().email(),
            password: Joi.string()
        }, async(error, data2) => {

            if (error) {
                return res.badRequest({
                    message: error.details[0].message
                });
            }
            await Employees.findOne({
                email: req.body.email
            }).populate('project').exec(function(error, employee) {
                if (error) {
                    return res.serverError({
                        'message': 'Either userName or password is incorrect'
                    })
                }
                if (employee) {
                    var access_token = jwt.sign({
                        exp: Date.now(),
                        token: employee.id,
                        password: employee.isPasswordSet,
                        role: employee.role
                    }, sails.config.scrtKey);

                    bcrypt.compare(req.body.password, employee.password, function(err, status) {
                        if (status) {
                            delete employee.password;
                            return res.send({
                                "message": 'You are successfully login',
                                "data": {
                                    'userData': employee,
                                    "accessToken": access_token
                                }
                            })
                        } else {
                            res.serverError({
                                "message": 'Password doesnot match',
                            })
                        }
                    })
                } else {
                    return res.serverError({
                        'message': 'Username is invalid'
                    })
                }
            })

        })
    },
    /**
     * Update the password of new employee .
     *
     * @param {object} req The request object
     * @param {object} res The response object
     * @author Sandeep Rao <sandeep@appinessworld.com>
     *
     * @api 			{post} /employees/updatePassword
     * @apiVersion 		1.0.0
     * @apiName 		Update
     * @apiGroup 		Employee
     * @apiDescription  Allows a new user to Update their password after login.
     *
     * @apiPermission 	none
     * @apiHeader       {String} Content-Type application/json , authorization:access-token from the login Api'
     * @apiParam        {String} newPassword The new employee’s password
     * @apiParam        {String} rePassword to validate newPassword
     * @apiParamExample {json} Request-Example:
     *      {
     *          "newPassword": "Saurav12",
     *          "rePassword": "Saurav123",
     *         
     *      }
     */
    updatePassword: async function(req, res) {
        var requestData = req.body;
        if (requestData.newPassword === requestData.rePassword) {
            //Employees.findOne({id:req.params('employeeId')})
            try {
                var updatedPassword = await Employees.update({
                    id: req.decode.token
                }).set({
                    'password': req.body.password,
                    'isPasswordSet': 'true'
                }).fetch();
                if (updatedPassword.length === 0) {
                    return res.forbidden({
                        msg: ' not found.'
                    });
                } else {
                    return res.ok({
                        msg: 'Password updated successfully.'
                    });
                }
            } catch (err) {
                return res.serverError("Database error");
            }
        } else {
            return res.send({
                msg: 'newPassword and rePasswords doesnot match'
            });
        }
    },
    /**
     * Update the deatils of existing employee .
     *
     * @param {object} req The request object
     * @param {object} res The response object
     * @author Sandeep Rao <sandeep@appinessworld.com>
     *
     * @api 			{put} /employees/updatePassword
     * @apiVersion 		1.0.0
     * @apiName 		Update
     * @apiGroup 		Employee
     * @apiDescription  Allows a Admin to update employees details.
     *
     * @apiPermission 	none
     * @apiHeader       {String} Content-Type application/json , authorization:access-token from the login Api'
     * @apiParamExample {json} Request-Example:
     *      {
     *          "name": "Foo",
     *          "email": "sandeep@appinessworld",
     *          "contactNo": "+14157778888",
     *          "role":"admin",
     *          "designation":"developer",
     *          "organization":"organization id",
     *          "password":"employee Password",
     *          "isPasswordSet":"false"
     *      }
     */
    updateUser: async function(req, res) {
        var requestData = req.body;

        try {
            var updatedUser = await Employees.update({
                id: req.params.employeeId
            }, requestData).fetch();
            if (updatedUser.length === 0) {
                return res.forbidden({
                    msg: ' not found.'
                });
            } else {
                return res.ok({
                    msg: 'Employees updated successfully.'
                });
            }
        } catch (err) {
            return res.serverError({
                message: "Either email or contactNo already exists in database"
            });
        }
    },
    /**
     * Returns details of particular employee
     *
     * @param {object} req The request object
     * @param {object} res The response object
     * @author Sandeep <sandeep@appinessworld.com>
     *
     * @api 			{get} /getEmployee Get details of particular employee
     * @apiVersion 		1.0.0
     * @apiName 		getEmployee of Organizations
     * @apiGroup 		Employee
     * @apiDescription  Returns details of particular employee
     *
     * @apiPermission 	None
     * @apiHeader       {String} Content-Type application/json , authorization:access-token from the login Api'
     * */
    getEmployee: (req, res) => {
        try {
            Employees.findOne({
                id: req.decode.token
            }).populate('organization').populate('project').exec(function(err, employee) {
                if (err) {
                    return res.serverError("Database error");
                }
                return res.ok({
                    "data": employee
                })
            });
        } catch (err) {
            return res.serverError({
                message: "Database Error"
            });
        }
    },
    /**
     * Returns a List of employees
     *
     * @param {object} req The request object
     * @param {object} res The response object
     * @author Sandeep <sandeep@appinessworld.com>
     *
     * @api 			{get} /getEmployee Get a List of employees only Admin can access this.
     * @apiVersion 		1.0.0
     * @apiName 		getAllEmployee of Organizations
     * @apiGroup 		Employee
     * @apiDescription  Returns  a List of employees
     *
     * @apiPermission 	None
     * @apiHeader       {String} Content-Type application/json , authorization:access-token from the login Api'
     * */
    getAllEmployee: async(req, res) => {
        try {
            var employeeList = await Employees.find().populate('organization').populate('project').populate('review');
            return res.ok({
                "data": employeeList
            })
        } catch (err) {
            return res.serverError({
                message: "Database Error"
            });
        }
    },
    deleteEmployee: async(req, res) => {
        /**
         * Returns a message
         *
         * @param {object} req The request object
         * @param {object} res The response object
         * @author Sandeep <sandeep@appinessworld.com>
         *
         * @api 			{delete} /deleteEmployee/{employeeId} Delete a particular record.
         * @apiVersion 		1.0.0
         * @apiName 		deleteEmployee
         * @apiGroup 		Employee
         * @apiDescription  Returns  message
         *
         * @apiPermission 	None
         * @apiHeader       {String} Content-Type application/json , authorization:access-token from the login Api'
         * */
        await Employees.destroy({
            id: req.params.employeeId
        }).exec((err, success) => {
            if (err) {
                return res.ok({
                    message: 'No record find with this id'
                })
            }
            return res.ok({
                message: 'Employee successfully deleted'
            })
        });
    },
    /**
     * Returns a message
     *
     * @param {object} req The request object
     * @param {object} res The response object
     * @author Sandeep <sandeep@appinessworld.com>
     *
     * @api 			{put} /addProjectToEmployee/{employeeId} Add Employee to project
     * @apiVersion 		1.0.0
     * @apiName 		addProjectToEmployee
     * @apiGroup 		Employee
     * @apiDescription  Returns  message
     *
     * @apiPermission 	None
     * @apiHeader       {String} Content-Type application/json , authorization:access-token from the login Api'
     * @apiParam        {String} id Employee Id that has to be added in project
     * @apiParam        {String} projectId Project Id in which employee is added
     * @apiParamExample {json} Request-Example:
     *                          {
     *                            'projectId':'ProjectId'  
     *                          }
     * */
    addProjectToEmployee: async(req, res) => {
        try {
            await Employees.addToCollection(req.params.employeeId, 'project', req.params.projectId);
            await Projects.addToCollection(req.params.projectId, 'employees', req.params.employeeId);
            res.ok({
                message: "Employee is successfully added to project"
            })
        } catch (err) {
            res.send({
                message: "Server Error"
            })
        }
    },

    /**
     * Returns a message
     *
     * @param {object} req The request object
     * @param {object} res The response object
     * @author Sandeep <sandeep@appinessworld.com>
     *
     * @api 			{put} /removeProjectToEmployee/{employeeId} Add Employee to project
     * @apiVersion 		1.0.0
     * @apiName 		removeProjectToEmployee
     * @apiGroup 		Employee
     * @apiDescription  Returns  message
     *
     * @apiPermission 	None
     * @apiHeader       {String} Content-Type application/json , authorization:access-token from the login Api'
     * @apiParam        {String} id Employee Id that has to be added in project
     * @apiParam        {String} projectId Project Id in which employee is added
     * @apiParamExample {json} Request-Example:
     *                          {
     *                            'projectId':'ProjectId'  
     *                          }
     * */
    removeProjectToEmployee: async(req, res) => {
        try {
            await Employees.removeToCollection(req.params.employeeId, 'project', req.body.projectId);
            await Projects.removeToCollection(req.body.projectId, 'employees', req.params.employeeId);
            res.ok({
                message: "Employee is successfully removed to project"
            })
        } catch (err) {
            res.send({
                message: "Server Error"
            })
        }
    },
    employeesSearch: async(req, res) => {
        var FirstDate = moment().subtract(20, 'hours').valueOf();
        var LastDate = moment().valueOf();
        var dataProject = [];
        try {
            var name = req.params.name.toLowerCase();

            await Employees.find({
                'name': { startsWith: name }
            }).exec(async(err, searchData) => {
                if (err) {
                    sails.log.error(err)
                }
                await Review.find({ 'reviewBy': req.decode.token, type: 'review' }).populate('reviewTo').exec(async(err, reviewList) => {
                    console.log('reviewList', reviewList)
                    reviewList.map((reviewData) => {
                        searchData.map((employeeData) => {
                            if (reviewData.reviewTo.id === employeeData.id) {
                                dataProject.push(employeeData)
                            }
                        })

                    })

                    function check_dupli(arr_A, arr_B) {
                        for (var i = arr_B.length - 1; i >= 0; i--) {
                            for (var j = 0; j < arr_A.length; j++) {
                                if (arr_B[i] === arr_A[j]) {
                                    arr_B.splice(i, 1);
                                }
                            }
                        }
                        arr_B.sort();
                    }
                    check_dupli(dataProject, searchData)
                    console.log('dataProject', searchData);
                    return res.ok({
                        'employees': searchData
                    })
                })

            });
        } catch (err) {
            return res.serverError({
                'message': 'server error'
            })
        }
    },


    getEmployeesOfProject: async(req, res) => {
        try {
            await Employees.find({ project: req.params('project') }).exec((err, searchData) => {
                if (err) {
                    sails.log.error(err)
                }
                return res.ok({
                    'search': searchData
                })
            });
        } catch (err) {
            return res.serverError({
                'message': 'server error'
            })
        }
    },
    employeeInProject: async(req, res) => {
        console.log('req.decode.token', req.decode.token);
        var id = req.params.projectId.split("&");
        var FirstDate = moment().subtract(20, 'hours').valueOf();
        var LastDate = moment().valueOf();
        var dataProject = [];
        try {
            await Employees.find({ 'id': { '!=': req.decode.token } }).populate('project', {
                where: { 'id': id }
            }).exec(async(err, employeeData) => {
                if (err) {
                    sails.log.error(err)
                }
                var projectEmployee = employeeData.filter((item) => {
                    return item.project.length > 0
                });
                await Review.find({ 'reviewBy': req.decode.token, type: 'review' }).populate('reviewTo').exec(async(err, reviewList) => {
                    console.log('reviewList', reviewList)
                    reviewList.map((reviewData) => {
                        projectEmployee.map((employeeData) => {
                            if (reviewData.reviewTo.id === employeeData.id) {
                                dataProject.push(employeeData)
                            }
                        })

                    })

                    function check_dupli(arr_A, arr_B) {
                        for (var i = arr_B.length - 1; i >= 0; i--) {
                            for (var j = 0; j < arr_A.length; j++) {
                                if (arr_B[i] === arr_A[j]) {
                                    arr_B.splice(i, 1);
                                }
                            }
                        }
                        arr_B.sort();
                    }
                    check_dupli(dataProject, projectEmployee)
                    console.log('dataProject', projectEmployee);
                    return res.ok({
                        'employees': projectEmployee
                    })
                })
            });
        } catch (err) {
            return res.serverError({
                'message': 'server error'
            })
        }
    }
};