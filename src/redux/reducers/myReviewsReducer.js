
let auth = {
    myreviewdata: '',
    hrdata: false,
    reviebymedata: ''
};
const myReviewReducer = (state = auth, action) => {
    switch (action.type) {
        case 'MyReviews':

            state = {
                ...state,
                myreviewdata: action.payload
            };
            break;
        case 'HrRating':
            state = {
                ...state,
                hrdata: action.payload
            };
            break;
            case 'ReviewByMe':
            state = {
                ...state,
                reviebymedata: action.payload
            };
            break;
        default:
    }
    return state;
};

export default myReviewReducer;