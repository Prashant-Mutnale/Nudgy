/**
 * ManagementFeedback.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        feedBackFrom: { 'type': 'string', required: true },
        message: { 'type': 'string', required: true }
    },

};