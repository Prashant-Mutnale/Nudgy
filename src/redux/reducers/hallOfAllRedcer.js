
let auth = {
	myreviewdataAll: '',
	hrdataAll: false,
};
const HofAllReviewReducer = (state = auth, action) => {
	switch (action.type) {
		case 'MyReviewsAll':

			state = {
				...state,
				myreviewdataAll: action.payload
			};
			break;
		case 'HrRatingAll':
			state = {
				...state,
				hrdataAll: action.payload
			};
			break;
		default:
	}
	return state;
};

export default HofAllReviewReducer;