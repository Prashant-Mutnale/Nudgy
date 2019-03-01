
let auth = {
    projectiddata: ''
};
const projectidReducer = (state = auth, action) => {
    switch (action.type) {
        case 'Projectid':

            state = {
                ...state,
                projectiddata: action.payload
            };
            break;
        default:
    }
    return state;
};

export default projectidReducer;