/**
 * ProjectsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    /**
      * Creates a new project .
      *
      * @param {object} req The request object
      * @param {object} res The response object
      * @author Sandeep Rao <sandeep@appinessworld.com>
      *
      * @api 			{post} /projects
      * @apiVersion 		1.0.0
      * @apiName 		Create
      * @apiGroup 		Projects
      * @apiDescription  Allows a Admin to create new project.
      * @apiHeader       {String} Content-Type application/json , authorization:access-token from the login Api'
      *
      * @apiPermission 	none
      * @apiHeader       {String} Content-Type application/json
      * @apiParam        {String} name Name of the new Project
      * @apiParam        {String} totalTeam Total Team required
      * @apiParam        {String} startDate Start Date format('YYYY-MM-DD')
      * @apiParam        {String} endDate End Date format('YYYY-MM-DD')
      * @apiParam        {String} status Status of Project ['notStarted','inProgress','completed']
      * @apiParam        {String} organization The new project belongsTo which organization
      
      
      * @apiParamExample {json} Request-Example:
      *      {
      *          "name": "Foo",
      *          "totalTeam": "5",
      *          "startDate": "2018-08-08",
      *          "endDate":"2018-09-08",
      *          "status":"notStarted",
      *          "organization":"organization id",
      *      }
      */
    create: function(req, res) {
        var projectDetails = req.body;

        const BaseJoi = require('joi');
        const Extension = require('joi-date-extensions');
        const Joi = BaseJoi.extend(Extension);

        Joi.validate(req.body, {
            name: Joi.string().required(),
            totalTeam: Joi.string().required(),
            startDate: Joi.date().format('YYYY-MM-DD'),
            endDate: Joi.date().format('YYYY-MM-DD'),
            organization: Joi.string().required(),
            status: Joi.string()
        }, async(error) => {

            if (error) {
                return res.badRequest({
                    messages: error.details[0].message
                });
            } else {

                try {

                    var projectData = await Projects.create(projectDetails).fetch()
                    return res.ok({
                        "message": 'Record created successfully',
                        "project": projectData
                    })

                } catch (err) {

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
            }
        })
    },
    /**
       * Creates a new project .
       *
       * @param {object} req The request object
       * @param {object} res The response object
       * @author Sandeep Rao <sandeep@appinessworld.com>
       *
       * @api 			{put} /updateProject/{projectId}
       * @apiVersion 		1.0.0
       * @apiName 		Update
       * @apiGroup 		Projects
       * @apiDescription  Allows a Admin to update existing project.
       * @apiHeader       {String} Content-Type application/json , authorization:access-token from the login Api'
       *
       * @apiPermission 	none
       * @apiHeader       {String} Content-Type application/json
       * @apiParam        {String} name Name of the new Project
       * @apiParam        {String} totalTeam Total Team required
       * @apiParam        {String} startDate Start Date format('YYYY-MM-DD')
       * @apiParam        {String} endDate End Date format('YYYY-MM-DD')
       * @apiParam        {String} status Status of Project ['notStarted','inProgress','completed']
       * @apiParam        {String} organization The new project belongsTo which organization
       
       
       * @apiParamExample {json} Request-Example:
       *      {
       *          "name": "Foo",
       *          "totalTeam": "5",
       *          "startDate": "2018-08-08",
       *          "endDate":"2018-09-08",
       *          "status":"notStarted",
       *         
       *      }
       */
    updateProject: async function(req, res) {

        var requestData = req.body;
        try {
            var updatedProject = await Projects.update({
                id: req.params.id
            }, requestData).fetch();
            if (updatedProject.length === 0) {
                return res.forbidden({
                    msg: ' not found.'
                });
            } else {
                return res.ok({
                    msg: 'Project updated successfully.'
                });
            }
        } catch (err) {
            return res.serverError({
                message: "server error"
            });
        }
    },
    getAllProjects: async(req, res) => {
        /**
         * Returns a List of Projects
         *
         * @param {object} req The request object
         * @param {object} res The response object
         * @author Sandeep <sandeep@appinessworld.com>
         *
         * @api 			{get} /getAllProjects Get a List of Projects only Admin can access this.
         * @apiVersion 		1.0.0
         * @apiName 		getAllProjects of Organizations
         * @apiGroup 		Project
         * @apiDescription  Returns  a List of Projects only for Admin 
         *
         * @apiPermission 	None
         * @apiHeader       {String} Content-Type application/json , authorization:access-token from the login Api'
         * */
        try {
            var projectList = await Projects.find().populate('organization').populate('employees');
            return res.ok({
                "data": projectList
            })
        } catch (err) {
            return res.serverError({
                message: "Database Error"
            });
        }
    },

};