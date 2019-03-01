/**
 * Organization.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        name: { type: 'string', required: true },
        email: { type: 'string', required: true, unique: true },
        contactNo: { type: 'string', required: true, unique: true },
        address: { type: 'json', required: true },
        employee: {
            collection: 'employees',
            via: 'organization'
        }
    },

};