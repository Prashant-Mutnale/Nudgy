
let auth = {
    feedbackData: {},
};
const feedbackReducer = (state = auth, action) => {
    switch (action.type) {
        case 'Feedback':

            state = {
                ...state,
                feedbackData: action.payload
            };
            break;
        default:
    }
    return state;
};

export default feedbackReducer;