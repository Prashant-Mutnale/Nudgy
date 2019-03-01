/**
 * OrganizationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    /**
     * Creates a new user with active false and sends OTP to their phone.
     *
     * @param {object} req The request object
     * @param {object} res The response object
     * @author Sandeep Rao <sandeep@appinessworld.com>
     *
     * @api 			{post} /organizations
     * @apiVersion 		1.0.0
     * @apiName 		Create
     * @apiGroup 		organization
     * @apiDescription  Allows a new organization to create their account.
     *
     * @apiPermission 	none
     * @apiHeader       {String} Content-Type application/json
     * @apiParam        {String} email The email address of the new organization
     * @apiParam        {String} name The name of the new organization
     * @apiParam        {String} contactNo The new organization’s phone number
     * @apiParam        {String} address The new organization’s address
     * @apiParam        {String} addressLine1 The new organization’s addressLine1
     * @apiParam        {String} addressLine2 The new organization’s addressLine2
     * @apiParam        {String} city The new organization’s city
     * @apiParam        {String} state The new organization’s state
     * @apiParam        {String} pincode The new organization’s pincode
     * @apiParamExample {json} Request-Example:
     *      {
     *          "name": "Foo",
     *          "email": "sandeep@appinessworld",
     *          "contactNo": "+14157778888",
     *          "address": {
     *                       "addressLine1": "FOO",
     *                       "addressLine1": "FOO2",
     *                       "city":"bangalore",
     *                       "state":"Karnataka",
     *                       "pinCode":"226022"
     *                      }
     *      }
     */
    create: (req, res) => {
        var requestData = req.body;
        var Joi = require('joi');
        Joi.validate(req.body, {
            name: Joi.string().required(),
            email: Joi.string().email(),
            contactNo: Joi.string().max(10),
            address: Joi.object().keys({
                addressLine1: Joi.string().required(),
                addressLine2: Joi.string(),
                city: Joi.string().required(),
                state: Joi.string().required(),
                pinCode: Joi.string().max(6).required()
            }).required()

        }, async(error) => {

            if (error) {
                return res.badRequest({
                    message: error.details[0].message
                });
            }
            try {

                var organization = await Organization.create(requestData).fetch()
                if (organization) {
                    return res.ok({
                        organization: organization,
                    });
                }
            } catch (err) {
                if (err.message.code === 'E_UNIQUE') {
                    return res.serverError({
                        message: "Either email or contactNo already exists in database"
                    });
                } else {
                    return res.serverError({
                        message: "Either email or contactNo already exists in database"
                    });
                }

            }

        })
    },
    /**
     * Returns a list of all the organizations
     *
     * @param {object} req The request object
     * @param {object} res The response object
     * @author Sandeep <sandeep@appinessworld.com>
     *
     * @api 			{get} /getOrganizations Get all apartments
     * @apiVersion 		1.0.0
     * @apiName 		get list of Organizations
     * @apiGroup 		Organization
     * @apiDescription  Returns a list of all the Organizations
     *
     * @apiPermission 	None
     * */
    getOrganizations: (req, res) => {
        try {
            Organization.findOne({ id: req.param('id') }).exec(function(err, organizationList) {
                if (err) {
                    return res.serverError("Database error");
                }
                return res.ok({
                    "data": organizationList
                })
            });
        } catch (err) {
            return res.serverError({
                message: "Database Error"
            });
        }
    },
    /**
     * Creates a new user with active false and sends OTP to their phone.
     *
     * @param {object} req The request object
     * @param {object} res The response object
     * @author Sandeep Rao <sandeep@appinessworld.com>
     *
     * @api 			{put} /organization/:id':'OrganizationController.updateOrganization',

     * @apiVersion 		1.0.0
     * @apiName 		Update
     * @apiGroup 		organization
     * @apiDescription  Allows a new organization to update their account.
     *
     * @apiPermission 	none
     * @apiHeader       {String} Content-Type application/json
     * @apiParam        {String} email The email address of the new organization
     * @apiParam        {String} name The name of the new organization
     * @apiParam        {String} contactNo The new organization’s phone number
     * @apiParam        {String} address The new organization’s address
     * @apiParam        {String} addressLine1 The new organization’s addressLine1
     * @apiParam        {String} addressLine2 The new organization’s addressLine2
     * @apiParam        {String} city The new organization’s city
     * @apiParam        {String} state The new organization’s state
     * @apiParam        {String} pincode The new organization’s pincode
     * @apiParamExample {json} Request-Example:
     *      {
     *          "name": "Foo",
     *          "email": "sandeep@appinessworld",
     *          "contactNo": "+14157778888",
     *          "address": {
     *                       "addressLine1": "FOO",
     *                       "addressLine1": "FOO2",
     *                       "city":"bangalore",
     *                       "state":"Karnataka",
     *                       "pinCode":"226022"
     *                      }
     *      }
     */
    updateOrganization: async function(req, res) {

        var requestData = req.body;
        try {
            Organization.findOne({ id: req.param('id') }).exec(async function(err, organizationList) {
                if (err) {
                    return res.serverError("Database error");
                }
                var updatedOrganization = await Organization.update({ id: req.param('id') }, requestData).fetch();
                if (updatedOrganization.length === 0) {
                    return res.forbidden({
                        msg: ' not found.'
                    });
                } else {
                    return res.ok({
                        msg: 'Organization updated successfully.'
                    });
                }
            })
        } catch (err) {
            return res.serverError({
                message: "Either email or contactNo already exists in database"
            });
        }
    },

};