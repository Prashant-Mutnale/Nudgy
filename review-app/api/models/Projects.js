/**
 * Projects.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        name: { type: 'string', required: true },
        totalTeam: { type: 'string', required: true },
        startDate: { type: 'string', columnType: 'date', required: true },
        endDate: { type: 'string', columnType: 'date', required: true },
        status: { type: 'string', enum: ['notStarted', 'inProgress', 'completed'], defaultsTo: 'notStarted' },
        organization: {
            model: 'organization'
        },
        employees: {
            collection: 'employees',
            via: 'project'
        }
    }
};