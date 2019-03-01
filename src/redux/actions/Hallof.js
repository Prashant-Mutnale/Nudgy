
import { Actions, Scene, Router, Animations } from 'react-native-router-flux'
import { Hof, BASEURL } from '../constant'
import { AsyncStorage } from 'react-native';
import Store from '../../storage'
let gettokenmain
export const hof = (statusvalue) => dispatch => {
    AsyncStorage.getItem('accesstoken').then((response) => {
        console.log("response", JSON.parse(response))
        gettokenmain = JSON.parse(response)
    }).then(() => {
        fetch(BASEURL + '/reviews/hallOfFame/' + statusvalue, {
            headers: {
                'authorization': gettokenmain,
                'Accept': 'application/json',
            },
        })
            .then(res => res.json())
            .then(response => dispatch({
                type: Hof,
                payload: response
            }))
        // .then((response) => {
        //     console.log("response", response)
        // })
    })

}