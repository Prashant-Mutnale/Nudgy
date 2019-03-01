
let auth = {
    shoutoutdata: ''
};
const ShoutoutReducer = (state = auth, action) => {
    if (action.type === 'emptydatared') {
        state = ""
    }
    switch (action.type) {
        case 'Shoutout':

            state = {
                ...state,
                shoutoutdata: action.payload
            };
            break;
        default:
    }
    return state;
};

export default ShoutoutReducer;