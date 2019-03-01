
import { Actions, Scene, Router, Animations } from 'react-native-router-flux'
import { Searchemloyee, BASEURL } from '../constant'
import { AsyncStorage } from 'react-native';
import Store from '../../storage'


export const employeesearch = (gettoken, employeename) => dispatch => {
    console.log("employeename", employeename)
    console.log("gettoken", gettoken)
    fetch(BASEURL + '/employees/employeesSearch/' + employeename, {
        headers: {
            'authorization': gettoken,
            'Accept': 'application/json',
        },
    })
        .then(res => res.json())

        .then(data => dispatch({
            type: Searchemloyee,
            payload: data
        }))
}