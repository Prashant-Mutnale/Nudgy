
let auth = {
    halldata: []
};
const HallReducer = (state = auth, action) => {
    switch (action.type) {
        case 'Hof':
            state = {
                ...state,
                halldata: action.payload
            };
            break;
        default:
    }
    return state;
};

export default HallReducer;