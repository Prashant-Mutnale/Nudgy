
import { Actions, Scene, Router, Animations } from 'react-native-router-flux'
import { Forgotpassword, BASEURL } from '../constant'
import Toast from 'react-native-simple-toast';

export const forgotpassword = (forgotdata) => dispatch => {
    console.log("forgotdata", forgotdata)
    fetch(BASEURL + '/employees/updatePassword', {
        method: 'Post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(forgotdata)
    })
        // .then(res => res.json())
        .then((response) => {
            console.log("response", response)
            if (response.status === 200) {
                // data => dispatch({
                //     type: Forgotpassword,
                //     payload: data
                // })
                Toast.show('Password changed successfully', );
                Actions.SignIn()
            }
            else if (response.status === 400 || response.status === 401) {
                Toast.show('Something went wrong', );
            }
        })
    // .then(data => dispatch({
    //     type: Forgotpassword,
    //     payload: data
    // }))
}