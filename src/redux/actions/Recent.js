
import { Actions, Scene, Router, Animations } from 'react-native-router-flux'
import { Recent, Recentdetails, BASEURL } from '../constant'
import { AsyncStorage } from 'react-native';
import Store from '../../storage'


export const recent = (gettoken) => dispatch => {
    // console.log("getuserid", userId)
    fetch(BASEURL + '/reviews', {
        headers: {
            'authorization': gettoken,
            'Accept': 'application/json',
        },
    })
        .then(res => res.json())

        .then(data => dispatch({
            type: Recent,
            payload: data
        }))
}


export const recentDetails = (gettoken, userid) => dispatch => {
    console.log("getuserid", userid)
    console.log("gottoken", gettoken)
    fetch(BASEURL + '/admin/employeeReview/'+userid, {
        headers: {
            'authorization': gettoken,
            'Accept': 'application/json',
        },
    })
        .then(res => res.json())

        .then(data => dispatch({
            type: Recentdetails,
            payload: data
        }))
}
