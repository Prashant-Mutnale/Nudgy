
import { Actions, Scene, Router, Animations } from 'react-native-router-flux'
import { Projectid, BASEURL } from '../constant'
import { AsyncStorage } from 'react-native';
import Store from '../../storage'

export const getProjectid = (gettoken) => dispatch => {
    fetch(BASEURL + '/employees', {
        headers: {
            'authorization': gettoken,
            'Accept': 'application/json',
        },
    })
        .then(res => res.json())

        .then(data => dispatch({
            type: Projectid,
            payload: data
        }))
}
