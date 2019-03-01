/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

    // For organization

    'post /organizations': 'OrganizationController.create',
    'get /organization/:id/getOrganizations': 'OrganizationController.getOrganizations',
    'put /organization/:id': 'OrganizationController.updateOrganization',

    // For Employee
    'post /employees': 'EmployeesController.create',
    'post /employees/signIn': 'EmployeesController.signIn',
    'post /employees/:employeeId/updatePassword': 'EmployeesController.updatePassword',
    'put /employees/:employeeId': 'EmployeesController.updateUser',
    'get /employees/:employeeId': 'EmployeesController.getEmployee',
    'get /admin/employees': 'EmployeesController.getAllEmployee',
    'delete /admin/employees/:employeeId': 'EmployeesController.deleteEmployee',
    'put /admin/add/employees/:employeeId/project/:projectId': 'EmployeesController.addProjectToEmployee',
    'put /admin/remove/employee/:employeeId/project/:projectId': 'EmployeesController.removeProjectToEmployee',
    'get /employees/employeesSearch/:name': 'EmployeesController.employeesSearch',
    'get /employees/:projectId/employees': 'EmployeesController.employeeInProject',



    //For Project 
    'post /projects': 'ProjectsController.create',
    'put /project/:projectId': 'ProjectsController.updateProject',
    'get /projects': 'ProjectsController.getAllProjects',
    //'get /projects/:projectId/employees': 'EmployeesController.getEmployeesOfProject',

    // For Review 
    'post /review': 'ReviewController.create',
    'get /reviews ': 'ReviewController.getAllReview',
    'get /reviews/:id/:type': 'ReviewController.getEmployeeReview',
    'get /reviews/hallOfFame/:type': 'ReviewController.hallOfFame',
    'post /shoutOut': 'ReviewController.shoutOut',
    'post /admin/review': 'ReviewController/hrRating',

    //For FeedBack 

    'post /mgmtFeedBack': 'ManagementFeedBackController.create',
    'get /admin/getFeedBacks': 'ManagementFeedBackController.getFeedBack'


};