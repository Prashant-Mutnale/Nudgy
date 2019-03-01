
let auth = {
    searchdata: ''
};
const SearchReducer = (state = auth, action) => {
    switch (action.type) {
        case 'Searchemloyee':

            state = {
                ...state,
                searchdata: action.payload
            };
            break;
        default:
    }
    return state;
};

export default SearchReducer;