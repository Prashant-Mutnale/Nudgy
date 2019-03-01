/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

    EmployeesController: {
        //create: ['isAuthenticated','isAdmin'],
        updatePassword: ['isAuthenticated'],
        updateUser: ['isAuthenticated', 'isAdmin'],
        getEmployee: ['isAuthenticated'],
        getAllEmployee: ['isAuthenticated', 'isAdmin'],
        deleteEmployee: ['isAuthenticated', 'isAdmin'],
        addProjectToEmployee: ['isAuthenticated', 'isAdmin'],
        removeProjectToEmployee: ['isAuthenticated', 'isAdmin'],
        employeesSearch: ['isAuthenticated'],
        employeeInProject: ['isAuthenticated'],
        getEmployeesOfProject: ['isAuthenticated'],

    },
    ProjectsController: {
        create: ['isAuthenticated', 'isAdmin'],
        getAllProjects: ['isAuthenticated', 'isAdmin'],
        updateProject: ['isAuthenticated', 'isAdmin'],
    },
    ReviewController: {
        create: ['isAuthenticated'],
        shoutOut: ['isAuthenticated'],
        getAllReview: ['isAuthenticated'],
        getEmployeeReview: ['isAuthenticated'],
        hallOfFame: ['isAuthenticated'],
        hrRating: ['isAuthenticated', 'isAdmin']
    },
    ManagementFeedBackController: {
        getFeedBack: ['isAuthenticated', 'isAdmin'],
        create: ['isAdmin']
    }
};