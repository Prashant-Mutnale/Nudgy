
let auth = {
    recentdata: '',
    recentdetailsdata: ''
};
const RecentReducer = (state = auth, action) => {
    switch (action.type) {
        case 'Recent':

            state = {
                ...state,
                recentdata: action.payload
            };
            break;
            case 'Recentdetails':

            state = {
                ...state,
                recentdetailsdata: action.payload
            };
            break;
        default:
    }
    return state;
};

export default RecentReducer;