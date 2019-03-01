/**
 * Employees.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        name: { type: 'string', required: true },
        organization: {
            model: 'organization'
        },
        project: {
            collection: 'projects',
            via: 'employees'
        },
        review: {
            collection: 'Review',
            via: 'reviewTo'
        },
        email: { type: 'string', required: true, unique: true },
        contactNo: { type: 'string', required: true, unique: true },
        password: { type: 'string', required: true },
        isPasswordSet: { type: 'string', isIn: ['true', 'false'], defaultsTo: 'false' },
        role: { type: 'string', isIn: ['admin', 'employee'], defaultsTo: 'employee' },
        designation: { type: 'string', isIn: ['developer', 'hr', 'designer', 'tester', 'null'], defaultsTo: 'null' }
    },
    beforeCreate: function(values, next) {
        var bcrypt = require('bcryptjs');
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(values.password, salt, function(err, hash) {
                values.password = hash;
                next();
            });
        });
    }

};