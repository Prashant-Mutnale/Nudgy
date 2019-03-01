
let auth = {
    isLogin: false,
    userData: {},
    accessToken: ''
};
const LoginReducer = (state = auth, action) => {
    switch (action.type) {
        case 'Login':

            state = {
                ...state,
                // accessToken: action.payload.accessToken,
                // isLogin: true,
                userData: action.payload
            };
            break;
        default:
    }
    return state;
};

export default LoginReducer;