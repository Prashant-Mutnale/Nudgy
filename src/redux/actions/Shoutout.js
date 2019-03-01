
import { Actions, Scene, Router, Animations } from 'react-native-router-flux'
import { Shoutout, BASEURL } from '../constant'
import { AsyncStorage } from 'react-native';
import Store from '../../storage'
import Toast from 'react-native-simple-toast';



export const shoutout = (gettoken, shoutdata) => dispatch => {
    console.log("calledshoutot")
    console.log("gettoken", gettoken)
    console.log("shoutdata", shoutdata)
    fetch(BASEURL + '/shoutOut', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            authorization: gettoken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(shoutdata)
    })
        .then(res => res.json())
        .then((res) => {
            console.log("response", res)
            if (res.message == "You have already ShoutOut this member this month") {
                console.log("maks")
                Toast.show(res.message);
                data => dispatch({
                    type: Shoutout,
                    payload: data
                })
            }
            else {
                Actions.popTo("Recent")
                Toast.show('Thankyou For your Feedback');
            }
        })
    // .then(res => res.json())
    // .then(data => dispatch({
    //     type: Shoutout,
    //     payload: data
    // }))
}



export const emptydata = () => dispatch => {
    console.log("emptydata")
    console.log("celld")
    dispatch({
        type: Shoutout,
        payload: ""
    })
}