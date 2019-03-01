
let auth = {
    reviewstatusdata: ''
};
const ReviewstatusReducer = (state = auth, action) => {
    switch (action.type) {
        case 'Reviewstatus':

            state = {
                ...state,
                reviewstatusdata: action.payload
            };
            break;
        default:
    }
    return state;
};

export default ReviewstatusReducer;