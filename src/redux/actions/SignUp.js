
import { Actions, Scene, Router, Animations } from 'react-native-router-flux'
import { SignUp, BASEURL } from '../constant'

export const Signup = (signupData) => dispatch => {
	console.log("BASEURL", BASEURL)
	fetch(BASEURL + '/employees', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(signupData)
	})
		.then((response) => {
			console.log(response)
			if (response.status === 200) {
				Actions.header()
			}
		})
		.then((error) => {
			console.log(error)
		})
	// .then(res => res.json())
	// .then(data => dispatch({
	//     type: Login,
	//     payload: data
	// }))
}


