import React from 'react';
import {
    TextInput,
    Text,
    TouchableOpacity,
    Image,
    View,
    StyleSheet,
    Dimensions,
    StatusBar,
    AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles/style';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/Login';

class Splash extends React.Component {
    constructor(props) {
        super(props)
    }
    // async componentDidMount() {
    //     const signindetails = await AsyncStorage.getItem("signindata")
    //     console.log("recent", signindetails)
    //     let parsedata = JSON.parse(signindetails)
    //     console.log("parsedata", parsedata.accessToken)
    //     let gettoken = parsedata.accessToken
    // }
    async componentDidMount() {
        const signindetails = await AsyncStorage.getItem("accesstoken")
        const getsignin = await AsyncStorage.getItem("signindata")
        // console.log("signindetails", signindetails)
       const emailidget =  await AsyncStorage.getItem("emailid")
       const password =  await AsyncStorage.getItem("password")
       console.log("emailidget", emailidget)
       console.log("password", password)
       let userdetails = {
            email: emailidget,
            password: password
       }
       if(emailidget!==null && password!==null){
            // this.props.login(userdetails)
            this.props.login(userdetails)
       }
       else{
        setTimeout(() => {
                Actions.SignIn()
                }, 3000)
       }
        // if (signindetails !== null) {
        //     setTimeout(() => {
        //         Actions.header()
        //     }, 3000)
        // }
        // else {
        //     Actions.SignIn()
        // }
        // console.log("signindetails", signindetails)
    }
    componentWillReceiveProps(nextProps){
        console.log("calledmain")
        // console.log("nextProps",nextProps.logindata.userData.message == "You are successfully login")
        if(nextProps.logindata.userData.message == "You are successfully login"){
            // console.log("logdin")
            Actions.header()
            AsyncStorage.setItem("accesstoken", JSON.stringify(nextProps.logindata.userData.data.accessToken))
            AsyncStorage.setItem("signindata", JSON.stringify(nextProps.logindata.userData.data))
        }
        else{
             Actions.SignIn()
        }
    }
    
    render() {
        return (
            <View style={styles.ContainerSplash}>
             <StatusBar backgroundColor="#000" barStyle="light-content" animated={true}/>
                {/* <StatusBar hidden = {true} /> */}
                <Text style={styles.LogoText}>
                <Image
                    source={require('../../assets/images/logo.png')}
                 />
                </Text>
                {/* <Text style={styles.LogoPara}>Sed ut perspiciatis unde omnis iste na</Text> */}
            </View>
        )
    }
}

// export default Splash

function mapStateToProps(state) {
    console.log(state)
    return {
        logindata: state.userData
    }
}

export default connect(mapStateToProps, { login })(Splash);