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
import styles from './styles/style'
import { TextField } from 'react-native-material-textfield';
import ButtonComman from '../Elements/ButtonComman'
import { connect } from 'react-redux'
import { login } from '../../redux/actions/Login'
import Ripple from 'react-native-material-ripple';
import Toast from 'react-native-simple-toast';
import { feedback, emptysharedata } from '../../redux/actions/shareFeedback'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

class shareFeedback extends React.Component {
    constructor(props) {
        super(props)
        this.gettoken = ""
        this.getid = ""
        this.state = {
            share: '',
            checked: false
        };
    }

    callshare(share) {
        console.log("share", share)
        this.setState({
            share: share
        })
    }

    onClick() {
        this.setState({
            checked: !this.state.checked
        });
    }

    async componentDidMount() {

        const signindetails = await AsyncStorage.getItem("signindata")
        let parsedata = JSON.parse(signindetails)
        console.log("parsedata", parsedata)
        gettoken = parsedata.accessToken
        getid = parsedata.userData.id
        console.log("getid", getid)
        console.log("gettoken", gettoken)
        this.getid = getid
        this.gettoken = gettoken

    }

    // successhandle() {
    //     Actions.Recent()
    // }
    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps.feedbackdata.feedbackData.feedbackData.feedBack)
        if (nextProps.feedbackdata.feedbackData.feedbackData.feedBack !== undefined) {
            Toast.show('Thankyou For your Feedback');
            this.props.emptysharedata()
            Actions.Recent()
            // Alert.alert(
            //     'Confirmation',
            //     'Thankyou For your Feedback',
            //     [
            //         { text: 'Ok', onPress: () => this.successhandle() },
            //         // { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            //         // { text: 'OK', onPress: () => console.log('OK Pressed') },
            //     ],
            //     { cancelable: false }
            // )
        } else {
            null
        }
    }

    submitShare() {
        console.log(this.state.share)
        console.log("gettoken", this.gettoken)
        console.log("getid", this.getid)
        let messagedata = {
            message: this.state.share,
            // anonymous: this.state.checked.toString()
        }
        if (this.state.share == "") {
            Toast.show('Please enter the message');
        } else {
            this.props.feedback(this.getid, this.gettoken, messagedata)
        }
    }

    render() {
        return (
            <ScrollView style={styles.container} keyboardShouldPersistTaps={'always'} keyboardDismissMode='on-drag'>
                <StatusBar backgroundColor="#fff" barStyle="dark-content" animated={true} />
                {/* <View style={styles.contanersignin}>
                    <Text style={styles.maintext}>Sign In</Text>
                    <Text style={styles.paraText}>Lorem ipsum dolor sit amet, conse ctetur adipiscing.</Text>
                </View> */}
                <View style={styles.feedbackHead}>
                    <Text style={{
                        fontSize: 14,
                        textAlign: "center",
                        fontFamily: "Roboto-Medium",
                    }}>You can share your feedback/suggestions to HR and Management here.</Text>
                </View>
                <View style={{ backgroundColor: 'red' }}></View>
                <View style={styles.forminput}>
                    <TextField
                        label='Write here...'
                        tintColor={'#000'}
                        labelTextStyle={styles.labelColorstyles}
                        value={this.state.share}
                        multiline={true}
                        // lineWidth = {0.6}
                        // activeLineWidth = {0.6}
                        textColor={styles.labelColor}
                        onSubmitEditing={() => this.submitShare()}
                        // baseColor = {'red'}
                        onChangeText={(share) => this.callshare(share)}
                        autoFocus={true}
                    />
                    {/* <TouchableOpacity
                        style={{ flexDirection: "row", marginTop: 10 }}
                        onPress={() => this.onClick()}>
                        <View style={{
                            flex: 0.1
                        }}>
                            {this.state.checked == false ? (
                                <MaterialCommunityIcons
                                    name="checkbox-blank-outline"
                                    size={30}
                                    color="#000"
                                />
                            ) : (
                                    <MaterialCommunityIcons
                                        name="checkbox-marked"
                                        size={30}
                                        color="#000"
                                    />
                                )}
                        </View>
                        <View style={{
                            flex: 1,
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                        }}>
                            <Text style={styles.anonymousText}>Anonymous</Text></View>
                    </TouchableOpacity> */}

                </View>
                <TouchableOpacity activeOpacity={1} disabled={this.state.share !== "" ? false : true}
                    onPressIn={() => this.submitShare()}
                    style={this.state.share !== "" ? [ButtonComman.button, styles.mgtop20] : [ButtonComman.DisabledButton, styles.mgtop20]}><Text
                        style={ButtonComman.buttonText}>Submit</Text></TouchableOpacity>
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        feedbackdata: state
    }
}

export default connect(mapStateToProps, { feedback, emptysharedata })(shareFeedback);
