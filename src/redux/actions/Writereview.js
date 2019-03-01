
import { Actions, Scene, Router, Animations } from 'react-native-router-flux'
import { Writereview, BASEURL } from '../constant'
import Toast from 'react-native-simple-toast';

export const writereview = (gettoken, reviewresponse) => dispatch => {
    console.log("called writereview")
    console.log("tokenvalue", gettoken)
    console.log("reviewgot", reviewresponse)
    // console.log(loginData)
    fetch(BASEURL + '/review', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            authorization: gettoken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewresponse)
    })
        // .then(res => res.json())
        .then((res) => {
            console.log("response", res)
            if (res.status == 200) {

                res.json()
                // Actions.ReviewStatus()
                Toast.show('Thanks for the review');
                res => dispatch({
                    type: Writereview,
                    payload: res
                })
            }
            else if (res.status == 400) {
                Toast.show('Your not allowed to write review for this month');
            }
            else {
                Toast.show('Something went wrong');
            }
        })

}