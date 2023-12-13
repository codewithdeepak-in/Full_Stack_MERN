const AccessControl = require('accesscontrol');

const allRights = {
    'create:any': ['*'],
    'read:any': ['*'],
    'update:any': ['*'],
    'delete:any': ['*']
}
let grantObject = {
    admin: {
        test: allRights, // router seh match kre.
        profile: allRights,
        articles: allRights
    },
    user: {
        test : {
            // limitation. 
        },
        profile: {
            'read:own': ['*', '!password', '!_id'],
            'update:own' : ['*', '!password', '!_id']
        },
        articles: {
            'read:any': ['*'],
        }
    }
}


const roles = new AccessControl(grantObject);


module.exports = { roles };