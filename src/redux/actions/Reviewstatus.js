import { Actions, Scene, Router, Animations } from 'react-native-router-flux'
import Toast from 'react-native-simple-toast';
import { Reviewstatus, BASEURL } from '../constant'
import { AsyncStorage } from 'react-native';
import Store from '../../storage'


export const reviewstatus = (getToken, projectId, frommyreview) => dispatch => {
    console.log("projectId", projectId)
    console.log("url", BASEURL + '/employees/' + projectId + '/employees')
    fetch(BASEURL + '/employees/' + projectId + '/employees', {
        headers: {
            'authorization': getToken,
            'Accept': 'application/json',
        },
    })
        .then(res => res.json())
        .then((res) => {
            console.log("res", res)
            console.log("res", res.employees)
            let getlength = res.employees.length
            let data = res
            console.log("getlength", getlength)
            if (getlength >= 1) {
                // console.log("res", res.employees)   
                dispatch({
                    type: Reviewstatus,
                    payload: data
                })
                Actions.ReviewStatus()
            }
            else if (frommyreview == "frommyreview") {
                Toast.show('No memebers to give review', );
            }
            else if (frommyreview == "fromdashboard") {
                Toast.show('No memebers to give review', );
            }
            else if (frommyreview = "writereview") {
                // Toast.show('Thank you for the review', );
                if (getlength >= 1) {
                    // console.log("res", res.employees)   
                    dispatch({
                        type: Reviewstatus,
                        payload: data
                    })
                    Actions.ReviewStatus()
                }
                else {
                    Actions.Recent()
                }
            }
        })
    // .then(data => dispatch({
    //     type: Reviewstatus,
    //     payload: data
    // }))
}
