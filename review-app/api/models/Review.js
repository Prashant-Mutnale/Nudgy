/**
 * Review.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
    attributes: {
        reviewMessage: { type: 'string' },
        reviewBy: { type: 'string' },
        employeeRating: { type: 'Json' },
        hrRating: { type: 'Json' },
        reviewTo: {
            model: 'Employees'
        },
        shoutOutRating: { type: 'string', defaultsTo: 'null' },
        type: { type: 'string', required: true },
        status: { type: 'string', enum: ['approved', 'waiting_for_approve'], defaultsTo: 'approved' }
    }
};