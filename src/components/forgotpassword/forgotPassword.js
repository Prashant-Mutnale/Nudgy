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
    Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Octicons from 'react-native-vector-icons/Octicons'
import styles from '../feedback/styles/style'
import { TextField } from 'react-native-material-textfield';
import ButtonComman from '../Elements/ButtonComman'
import { connect } from 'react-redux'
import { login } from '../../redux/actions/Login'
import Ripple from 'react-native-material-ripple';
import Toast from 'react-native-simple-toast';
import { forgotpassword } from '../../redux/actions/ForgotPassword'

class forgotPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            share: '',
            changepassword: '',
            renterpassword: ''
        }
        this.enterpass = this.enterpass.bind(this)
        this.renterpass = this.renterpass.bind(this)
    }
    componentDidMount() {
        console.log("checkeail", this.props.email)
    }
    enterpass(enterpass) {
        console.log("enterpass", enterpass)
        this.setState({
            changepassword: enterpass
        })
    }
    renterpass(renterpassword) {
        this.setState({
            renterpassword: renterpassword,
        })
    }
    passwordchanged() {
        if (this.state.changepassword == this.state.renterpassword) {
            let chnagepassword = {
                newPassword: this.state.changepassword,
                rePassword: this.state.renterpassword,
                email: this.props.email
            }
            this.props.forgotpassword(chnagepassword)
        }
        else {
            Toast.show('Password did not match');
        }
    }

    render() {
        return (
            <ScrollView style={styles.container} keyboardShouldPersistTaps={'always'} keyboardDismissMode='on-drag'>
                <StatusBar backgroundColor="#000" barStyle="light-content" animated={true} />
                {/* <View style={styles.contanersignin}>
                    <Text style={styles.maintext}>Sign In</Text>
                    <Text style={styles.paraText}>Lorem ipsum dolor sit amet, conse ctetur adipiscing.</Text>
                </View> */}
                <View style={styles.forminput}>
                    <TextField
                        label='Email'
                        tintColor={'#30A9A7'}
                        labelTextStyle={styles.labelColorstyles}
                        value={this.props.email}
                        editable={false}
                        // lineWidth = {0.6}
                        // activeLineWidth = {0.6}
                        textColor={styles.labelColor}
                        onSubmitEditing={() => this.passwordchanged()}
                        // baseColor = {'red'}
                        onChangeText={(password) => this.enterpass(password)}
                    />
                    <TextField
                        autoCapitalize='none'
                        secureTextEntry={true}
                        label='Enter Password'
                        tintColor={'#30A9A7'}
                        labelTextStyle={styles.labelColorstyles}
                        value={this.state.changepassword}
                        // lineWidth = {0.6}
                        // activeLineWidth = {0.6}
                        textColor={styles.labelColor}
                        onSubmitEditing={() => this.passwordchanged()}
                        // baseColor = {'red'}
                        onChangeText={(password) => this.enterpass(password)}
                    />
                    <TextField
                        autoCapitalize='none'
                        secureTextEntry={true}
                        label='Re-enter Password'
                        tintColor={'#30A9A7'}
                        labelTextStyle={styles.labelColorstyles}
                        value={this.state.renterpassword}
                        // lineWidth = {0.6}
                        // activeLineWidth = {0.6}
                        textColor={styles.labelColor}
                        onSubmitEditing={() => this.passwordchanged()}
                        // baseColor = {'red'}
                        onChangeText={(renterpassword) => this.renterpass(renterpassword)}
                    />

                    <TouchableOpacity activeOpacity={1} disabled={this.state.changepassword !== "" && this.state.renterpassword !== "" ? false : true} onPress={() => this.passwordchanged()} style={this.state.changepassword !== "" && this.state.renterpassword !== "" ? [ButtonComman.button, styles.mgtop20] : [ButtonComman.DisabledButton, styles.mgtop20]}><Text style={ButtonComman.buttonText}>Change password</Text></TouchableOpacity>

                </View>
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        passworddata: state
    }
}

export default connect(mapStateToProps, { forgotpassword })(forgotPassword);
