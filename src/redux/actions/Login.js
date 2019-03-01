
import { Actions, Scene, Router, Animations } from 'react-native-router-flux'
import { Login, BASEURL } from '../constant'

export const login = (loginData) => dispatch => {
    console.log("called actions")
    console.log(loginData)
    console.log("BASEURL",BASEURL)
    fetch(BASEURL + '/employees/signIn', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
    })
        .then(res => res.json())
        .then(data => dispatch({
            type: Login,
            payload: data
        }))
}






// export const login = (loginData) =>{
//    return dispatch => fetch('http://demo.knoit.co:1337/v1/apartments', {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//          },
//         // body: JSON.stringify(loginData),
//     }).then((response) => response.json()).then((responseJson) => {
//         console.log('responseJson',responseJson);
//         dispatch({
//             payload:responseJson,
//             type: 'Login'
//         });
//         Actions.header();
//     },(error)=>{
//         console.log(error);
//     })
//         .catch((error) => {
//             console.error(error);
//         });

// }








