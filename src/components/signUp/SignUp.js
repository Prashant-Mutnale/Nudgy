import React from 'react';
import {
	TextInput,
	Text,
	TouchableOpacity,
	Image,
	View,
	StyleSheet,
	ScrollView,
	Dimensions,
	StatusBar,
	AsyncStorage,
	Alert,
	BackHandler,
	KeyboardAvoidingView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles/style'
import { TextField } from 'react-native-material-textfield';
import ButtonComman from '../Elements/ButtonComman'
import { connect } from 'react-redux'
import { Signup } from '../../redux/actions/SignUp'
import Toast from 'react-native-simple-toast';
let tokenFcm
class SignUp extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			username: '',
			password: '',
			contact: '',
			myKey: {}
		};
		this.callusername = this.callusername.bind(this)
		this.signUp = this.signUp.bind(this)
		this.forgotpassword = this.forgotpassword.bind(this)
	}
	callusername(username) {
		console.log("user", username)
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (!filter.test(username)) {
			console.log("username", username)
			// alert('Please provide a valid email address');
			return false
		}
		else {
			this.setState({
				username: username
			})
			console.log("nameuser", this.state.username)
		}
		// alert("celld")
		// this.setState({
		//     username: username
		// })
		// console.log("makeit call", this.state.username)
	}
	callname(name) {
		this.setState({
			name: name
		})
	}
	callcontact(contactno) {
		this.setState({
			contact: contactno
		})
	}
	forgotpassword() {
		if (this.state.username !== "") {
			Actions.forgotpassword({ email: this.state.username })
		}
		else {
			Toast.show('Please enter the valid email');
		}
	}
	// componentDidMount(){
	//     FCM.requestPermissions();

	//     FCM.getFCMToken().then(token => {
	//       console.log("TOKEN (getFCMToken)", token);
	//        tokenFcm = token
	//     });
	// }
	componentWillMount() {
		BackHandler.addEventListener('hardwareBackPress', this.backPressed);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
	}
	backPressed = () => {
		console.log("newscence", Actions.currentScene)
		if (Actions.currentScene == "SignIn") {
			console.log("yes this screen")
			BackHandler.exitApp();
		}
		else {
			console.log("otherscreen")
		}
	}
	callpassword(password) {
		this.setState({
			password: password
		})
	}
	// componentWillReceiveProps(nextProps) {
	// 	console.log("nextProps", nextProps.logindata.userData)
	// 	// console.log("nextProps", nextProps.logindata.userData.data.accessToken)
	// 	// if (nextProps.logindata.userData.data.accessToken !== "") {
	// 	//     Actions.header()
	// 	// }
	// 	if (nextProps.logindata.userData.message !== "Password doesnot match" && nextProps.logindata.userData.message !== "Username is invalid") {
	// 		if (nextProps.logindata.userData.data !== "") {
	// 			AsyncStorage.setItem("signindata", JSON.stringify(nextProps.logindata.userData.data))
	// 			AsyncStorage.setItem("accesstoken", JSON.stringify(nextProps.logindata.userData.data.accessToken))
	// 			Actions.Recent()
	// 		}
	// 	}
	// 	else {
	// 		if (nextProps.logindata.userData.message == "Password doesnot match") {
	// 			// Alert password
	// 			// Alert.alert(
	// 			//     'Error',
	// 			//     'Please enter the valid password',
	// 			//     [
	// 			//         { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
	// 			//         { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
	// 			//         { text: 'OK', onPress: () => console.log('OK Pressed') },
	// 			//     ],
	// 			//     { cancelable: false }
	// 			// )
	// 			// console.log('Please enter the valid password', )
	// 			Toast.show('Please enter the valid password');
	// 			// Alert password
	// 		}
	// 		else {
	// 			// Alertmessage

	// 			// Alert.alert(
	// 			//     'Error',
	// 			//     'Please enter the valid email id',
	// 			//     [
	// 			//         // { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
	// 			//         { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
	// 			//         { text: 'OK', onPress: () => console.log('OK Pressed') },
	// 			//     ],
	// 			//     { cancelable: false }
	// 			// )

	// 			// alertmessage

	// 			Toast.show('Please enter the valid email id');
	// 			console.log('Please enter the valid email id')
	// 		}
	// 	}
	// }
	signUp() {
		// console.log(this.state.username)
		// console.log(this.state.password)
		// console.log("called")
		let signUpUserdetails = {
			name: this.state.name,
			email: this.state.username,
			password: this.state.password,
			contactNo: this.state.contact,
			role: 'employee',
			organization: '5bd6c798666df006f110e9de',
			// FcmDeviceId: tokenFcm
		}
		console.log("signUpUserdetails", signUpUserdetails)
		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		if (!reg.test(this.state.username) == false) {
			Toast.show('Please enter the valid email id');
			return false;
		}
		else if (this.state.password == "") {
			Toast.show("Please enter the password")
		}
		else {
			// this.props.login(userdetails)
			this.props.Signup(signUpUserdetails)
			console.log("cakkkd")
			AsyncStorage.setItem("emailid", this.state.username)
			AsyncStorage.setItem("password", this.state.password)
		}
		// // Actions.header()


		// console.log("gemaindata", this.props.logindata)
		// // AsyncStorage.setItem("products", JSON.stringify(this.props.logindata.userData))
		// //     .then(() => {
		// //         console.log("It was saved successfully")
		// //         Actions.header()
		// //     })
		// //     .catch(() => {
		// //         console.log("There was an error saving the product")
		// //     })
		console.log(this.state.username)
	}
	render() {
		let { username } = this.state.username
		let { password } = this.state.password
		return (
			<ScrollView contentContainerStyle={styles.containersin}

			// style={styles.containersin} keyboardShouldPersistTaps={'always'} keyboardDismissMode='on-drag'
			>
				<StatusBar backgroundColor="#000" barStyle="light-content" animated={true} />

				<View style={styles.forminput}>

					<TextField
						autoCapitalize='none'
						label='Username'
						tintColor={'#30A9A7'}
						labelTextStyle={styles.labelColorstyles}
						onSubmitEditing={() => this.signUp()}
						value={this.state.name}
						// keyboardType='email-address'
						// lineWidth = {0.6}
						// activeLineWidth = {0.6}
						textColor={styles.labelColor}
						// baseColor = {'red'}
						onChangeText={(name) => this.callname(name)}
					/>
					<TextField
						autoCapitalize='none'
						label='Email'
						tintColor={'#30A9A7'}
						labelTextStyle={styles.labelColorstyles}
						onSubmitEditing={() => this.signUp()}
						value={username}
						keyboardType='email-address'
						// lineWidth = {0.6}
						// activeLineWidth = {0.6}
						textColor={styles.labelColor}
						// baseColor = {'red'}
						onChangeText={(username) => this.callusername(username)}
					/>
					<TextField
						// inputContainerStyle={styles.textinputmargin}
						label='Contact No'
						tintColor={'#30A9A7'}
						labelTextStyle={styles.labelColor}
						value={this.state.contact}
						keyboardType='numeric'
						maxLength={10}
						onSubmitEditing={() => this.signUp()}
						// lineWidth = {0.6}
						// activeLineWidth = {0.6}
						textColor={styles.labelColor}
						// baseColor = {'red'}
						onChangeText={(contact) => this.callcontact(contact)}
					/>
					<TextField
						// inputContainerStyle={styles.textinputmargin}
						label='Password'
						secureTextEntry={true}
						tintColor={'#30A9A7'}
						labelTextStyle={styles.labelColor}
						value={password}
						onSubmitEditing={() => this.signUp()}
						// lineWidth = {0.6}
						// activeLineWidth = {0.6}
						textColor={styles.labelColor}
						// baseColor = {'red'}
						onChangeText={(password) => this.callpassword(password)}
					/>

					<TouchableOpacity disabled={this.state.username && this.state.contact && this.state.name && this.state.password !== "" ? false : true} onPressIn={() => this.signUp()} onSubmitEditing={() => this.signUp()} style={this.state.username && this.state.contact && this.state.name && this.state.password !== "" ? [ButtonComman.button, styles.mgtop20] : [ButtonComman.DisabledButton, styles.mgtop20]}><Text style={ButtonComman.buttonText}>SIGN UP</Text></TouchableOpacity>

				</View>

				{/* <View style={styles.haveaccount}>
                    <Text style={styles.TextAccount}>Don't have an account ?</Text>
                    <TouchableOpacity style={styles.margLef10}><Text style={styles.SignUpText} >Sign up</Text></TouchableOpacity>
                </View> */}

			</ScrollView>
		)
	}
}

function mapStateToProps(state) {
	console.log(state)
	return {
		signUpdata: state
	}
}


export default connect(mapStateToProps, { Signup })(SignUp);
