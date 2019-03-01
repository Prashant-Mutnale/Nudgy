
let auth = {
	signUpData: {},
};
const SignUpReducer = (state = auth, action) => {
	switch (action.type) {
		case 'Signup':

			state = {
				...state,
				// accessToken: action.payload.accessToken,
				// isLogin: true,
				signUpData: action.payload
			};
			break;
		default:
	}
	return state;
};

export default SignUpReducer;