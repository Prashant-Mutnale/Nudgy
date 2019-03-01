
let auth = {
    writereviewdata: ''
};
const WritereviewReducer = (state = auth, action) => {
    switch (action.type) {
        case 'Writereview':

            state = {
                ...state,
                // accessToken: action.payload.accessToken,
                // isLogin: true,
                writereviewdata: action.payload
            };
            break;
        default:
    }
    return state;
};

export default WritereviewReducer;