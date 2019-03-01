
let auth = {
    forgotdata: ''
};
const forgotReducer = (state = auth, action) => {
    switch (action.type) {
        case 'Login':

            state = {
                ...state,
                // accessToken: action.payload.accessToken,
                // isLogin: true,
                forgotdata: action.payload
            };
            break;
        default:
    }
    return state;
};

export default forgotReducer;