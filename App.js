import React, { Component } from 'react';
import {
    Platform,
    BackHandler,
    BackAndroid,
    Text,
    View,
    AsyncStorage,
    TouchableOpacity,
    NetInfo,
    AppState
} from 'react-native';
import Test from './src/components/test';
import Splash from './src/components/splash/Splash'
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from "react-native-fcm";
import SignIn from './src/components/signin/SignIn'
import TabIcon from './src/components/tabIcon'
import Recent from './src/components/dashboard/Recent';
import Hof from './src/components/dashboard/Hof';
import MyReviews from './src/components/dashboard/MyReviews';
import WriteReviews from './src/components/dashboard/writeReviews';
import ShoutOut from './src/components/shout/shoutOut';
import ReviewStatus from './src/components/dashboard/ReviewStatus';
import MyReviewsmain from './src/components/dashboard/MyReviewmain';
import ReviewByme from './src/components/dashboard/reviewByme';
import MyReviewDetails from './src/components/dashboard/MyReviewDetails';
import forgotPassword from './src/components/forgotpassword/forgotPassword';
import shareFeedback from './src/components/feedback/shareFeedback';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from './src/components//Elements/colors'
import store from './src/redux/store'
import { recent } from './src/redux/actions/Recent'
import RecentDetails from './src/components/dashboard/RecentDetails';
import HofAllReview from './src/components/dashboard/HofAllReview';
import { hof } from './src/redux/actions/Hallof'
import { myreviews } from './src/redux/actions/MyReviews'
import Networksign from './src/components/networkfail'
import DeviceInfo from 'react-native-device-info';
import ShoutOutSearch from './src/components/shout/shoutOutSearch'
import SignUp from './src/components/signUp/SignUp'

import { Actions, Scene, Router, Animations, Reducer, ActionConst } from 'react-native-router-flux';


//Redux
let gettoken
let getid
import Store from './src/redux/store';
import { connect, Provider } from "react-redux";
export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isConnected: true,
            lastupdated: 'present',
        }
        this.child = React.createRef();
        // this.doWhateverAPICallsINeed = this.doWhateverAPICallsINeed.bind(this)
        this.handleAppStatehange = this.handleAppStatehange.bind(this)
    }
    async componentDidMount() {
        const systemName = DeviceInfo.getSystemName();
        console.log("systemName", systemName)
        AppState.addEventListener('change', this.handleAppStatehange);
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        const signindetails = await AsyncStorage.getItem("signindata")
        let parsedata = JSON.parse(signindetails)
        console.log("parsedata", parsedata.userData.id)
        getid = parsedata.userData.id
        gettoken = parsedata.accessToken


        FCM.requestPermissions();

        FCM.getFCMToken().then(token => {
            console.log("TOKEN (getFCMToken)", token);
        });
        FCM.getInitialNotification().then(notif => {
            console.log("INITIAL NOTIFICATION", notif)
        });
        this.notificationListner = FCM.on(FCMEvent.Notification, notif => {
            console.log("Notification", notif);
            if (notif.local_notification) {
                return;
            }
            if (notif.opened_from_tray) {
                return;
            }

            if (Platform.OS === 'ios') {
                //optional
                //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
                //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
                //notif._notificationType is available for iOS platfrom
                switch (notif._notificationType) {
                    case NotificationType.Remote:
                        notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                        break;
                    case NotificationType.NotificationResponse:
                        notif.finish();
                        break;
                    case NotificationType.WillPresent:
                        notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                        break;
                }
            }
            this.showLocalNotification(notif);
        });
        this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, token => {
            console.log("TOKEN (refreshUnsubscribe)", token);
        });
    }
    showLocalNotification(notif) {
        FCM.presentLocalNotification({
            title: notif.title,
            body: notif.body,
            priority: "high",
            click_action: notif.click_action,
            show_in_foreground: true,
            local: true,
            wake_screen: true,
            show_in_foreground: true
        });
    }
    callmebutton() {
        console.log("called the data")
    }


    // onClick = () => {
    //     Actions.refs.hof
    // };
    // doWhateverAPICallsINeed(gettoken, iddata) {
    //     // Actions.popTo("MyReviews")
    //     console.log("apptoken", gettoken)
    //     console.log("apptoken", gettoken)
    //     store.dispatch(hof(gettoken, iddata))
    // }
    // componentWillMount(){
    //     doWhateverAPICallsINeed();
    // }
    showLocalNotification(notif) {
        FCM.presentLocalNotification({
            title: notif.title,
            body: notif.body,
            priority: "high",
            click_action: notif.click_action,
            show_in_foreground: true,
            local: true
        });
    }
    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStatehange);
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
        // this.notificationListner.remove();
        // this.refreshTokenListener.remove();
    }
    handleAppStatehange(appState) {
        if (appState == "background") {

        }
    }
    handleConnectivityChange = isConnected => {
        if (isConnected) {
            this.setState({ isConnected });
        } else {
            this.setState({ isConnected });
        }
    };
    // doSomething = () => {
    //     this.props.recent() // do stuff
    // }
    render() {
        if (!this.state.isConnected) {
            return <Networksign />;
        }

        let fontSizeHeading = 20;
        const RouterWithRedux = connect()(Router);
        const scenes = Actions.create(
            <Scene key="root">

                <Scene key="Splash" title={'Splash'} component={Splash} hideNavBar={true} initial />

                <Scene key="SignIn" title={'Signin'} component={SignIn} hideNavBar={true} panHandlers={null} gesturesEnabled={false} />
                <Scene key="signup" component={SignUp} navigationBarStyle={{ elevation: 0, fontFamily: "Roboto-Medium", backgroundColor: '#fff', borderBottomColor: 'transparent' }} renderTitle={() => { return <View style={{ marginLeft: 10 }}><Text style={{ color: '#000', fontSize: fontSizeHeading }}>Sign Up</Text></View> }} backButtonTextStyle={{ color: '#000' }} back={true} backButtonTintColor={'#000'} renderLeftButton={() => <View />} gesturesEnabled={false} />
                <Scene tabs={true}
                    key="header"
                    hideNavBar={true}
                    forceRenderTabPanel={true}
                    gesturesEnabled={false}
                    headerMode='none'
                    // activeBackgroundColor='red'
                    // lazy="true"
                    renderTitle={() => { return <View style={{ marginLeft: 10 }}><Text style={{ color: '#fff', fontSize: fontSizeHeading, fontFamily: "Roboto-Regular", }}>Nudgy</Text></View> }}
                    wrap={false}
                    indicatorStyle={styles.indicatorStyle}
                    tabStyle={styles.tab}
                    tabBarStyle={{ backgroundColor: colors.blackBackground, paddingTop: 10, paddingBottom: 0, fontFamily: "Roboto-Medium" }}
                    labelStyle={{ color: '#fff', fontSize: 13, borderRadius: 50 }}
                    // tabBarSelectedItemStyle={{backgroundColor: 'red'}}
                    tabBarPosition='top'
                    navigationBarStyle={{ elevation: 0, backgroundColor: colors.blackBackground }}
                    // activeTintColor='#93a8d5'
                    // inactiveTintColor='#3b5998'
                    renderLeftButton={() => { return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 20 }}></View> }}

                    //  renderRightButton={()=>{return <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingRight:20}}><MaterialCommunityIcons name='bullhorn' size={25} color="#ffffff"/><MaterialIcons name='notifications' size={25} color="#ffffff"/></View>}}
                    renderRightButton={() => { return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingRight: 20, flexDirection: 'row', flex: 1 }}><TouchableOpacity onPressIn={() => Actions.shoutOut()} activeOpacity={1} style={{ marginRight: 10 }}><MaterialCommunityIcons name='bullhorn' size={30} color="#ffffff" /></TouchableOpacity><TouchableOpacity activeOpacity={1}><MaterialIcons name='notifications' size={30} color="#ffffff" /></TouchableOpacity></View> }}
                >
                    <Scene key="Recent" title={'RECENT'} tabBarLabel={TabIcon} component={Recent}
                        onEnter={() => store.dispatch(recent(gettoken))}
                    // onEnter={() => this.callme()}
                    />
                    <Scene key="Hof" title={'HOF'} tabBarLabel={TabIcon} component={Hof}
                        onEnter={() => store.dispatch(hof("all"))}
                    // onEnter={() => this.doWhateverAPICallsINeed()}
                    />
                    {/* <Scene title={'MY REVIEWS'} tabBarLabel={TabIcon} key="MyReviews" >
                        <Scene key="MyReviews" component={MyReviews} />
                        <Scene key="ReviewStatus" component={ReviewStatus} />
                    </Scene> */}
                    {/* <Scene key="MyReviews" component={MyReviews}
                        // onEnter={() => store.dispatch(myreviews(gettoken, getid, "present"))} 
                        tabBarLabel={TabIcon} tabBarLabel="MY REVIEWS" /> */}
                    <Scene key="myreviewmain" component={MyReviewsmain}
                        // onEnter={() => store.dispatch(myreviews(gettoken, getid, "present"))} 
                        tabBarLabel={TabIcon} tabBarLabel="MY REVIEWS" />
                </Scene>
                <Scene key="myreviews" component={MyReviews} navigationBarStyle={{ elevation: 0, fontFamily: "Roboto-Medium", backgroundColor: '#fff', borderBottomColor: 'transparent' }} renderTitle={() => { return <View style={{ marginLeft: 10 }}><Text style={{ color: '#000', fontSize: fontSizeHeading }}>Rate your teammate</Text></View> }} backButtonTextStyle={{ color: '#000' }} back={true} backButtonTintColor={'#000'} renderLeftButton={() => <View />} onBack={() => Actions.Recent()} gesturesEnabled={false} />
                <Scene key="ReviewStatus" component={ReviewStatus} navigationBarStyle={{ elevation: 0, fontFamily: "Roboto-Medium", backgroundColor: '#fff', borderBottomColor: 'transparent' }} renderTitle={() => { return <View style={{ marginLeft: 10 }}><Text style={{ color: '#000', fontSize: fontSizeHeading }}>Rate your teammate</Text></View> }} backButtonTextStyle={{ color: '#000' }} back={true} backButtonTintColor={'#000'} renderLeftButton={() => <View />} onBack={() => Actions.popTo('Recent')} gesturesEnabled={false} />
                <Scene key="writeReview" navigationBarStyle={{ elevation: 0, fontFamily: "Roboto-Medium", backgroundColor: '#fff', borderBottomColor: 'transparent' }} renderTitle={() => { return <View style={{ marginLeft: 10 }}><Text style={{ color: '#000', fontSize: fontSizeHeading }}>Write reviews</Text></View> }} component={WriteReviews} back={true} backButtonTintColor={'#000'} backButtonTextStyle={{ color: '#000' }} />
                <Scene key="shoutOut" navigationBarStyle={{ elevation: 0, fontFamily: "Roboto-Medium", backgroundColor: '#fff', borderBottomColor: 'transparent' }} renderTitle={() => { return <View style={{ marginLeft: 10 }}><Text style={{ color: '#000', fontSize: fontSizeHeading }}>Give a shout out </Text></View> }} backButtonTextStyle={{ color: '#000' }} component={ShoutOut} back={true} backButtonTintColor={'#000'} onBack={() => Actions.popTo('Recent')} />
                <Scene key="recentDetails" navigationBarStyle={{ elevation: 0, fontFamily: "Roboto-Medium", backgroundColor: '#fff', borderBottomColor: 'transparent' }} renderTitle={() => { return <View style={{ marginLeft: 10 }}><Text style={{ color: '#000', fontSize: fontSizeHeading }}>{Platform.OS === "ios" ? null : "Back"}</Text></View> }} backButtonTextStyle={{ color: '#000' }} component={RecentDetails} back={true} backButtonTintColor={'#000'} backTitle="Back" />
                <Scene key="sharefeedback" navigationBarStyle={{ elevation: 0, fontFamily: "Roboto-Medium", backgroundColor: '#fff' }} renderTitle={() => { return <View style={{ marginLeft: 10 }}><Text style={{ color: '#000', fontSize: fontSizeHeading }}>Write to HR</Text></View> }} back={true} backButtonTintColor={'#000'} renderLeftButton={() => <View />} component={shareFeedback} />
                <Scene key="forgotpassword" navigationBarStyle={{ elevation: 0, fontFamily: "Roboto-Medium", backgroundColor: '#fff', borderBottomColor: 'transparent' }} renderTitle={() => { return <View style={{ marginLeft: 10 }}><Text style={{ color: '#000', fontSize: fontSizeHeading }}>Forgot Password</Text></View> }} backButtonTintColor={'#000'} backButtonTextStyle={{ color: '#000' }} back={true} backButtonTintColor={'#000'} renderLeftButton={() => <View />} onBack={() => Actions.pop()} component={forgotPassword} back={true} backButtonTintColor={'#000'} />
                <Scene key="reviewbyme" navigationBarStyle={{ elevation: 0, fontFamily: "Roboto-Medium", backgroundColor: '#fff', borderBottomColor: 'transparent' }} renderTitle={() => { return <View style={{ marginLeft: 10 }}><Text style={{ color: '#000', fontSize: fontSizeHeading }}>My Reviewd list</Text></View> }} backButtonTextStyle={{ color: '#000' }} component={ReviewByme} back={true} backButtonTintColor={'#000'} />
                <Scene key="hofallreview" navigationBarStyle={{ elevation: 0, fontFamily: "Roboto-Medium", backgroundColor: '#fff', borderBottomColor: 'transparent' }} renderTitle={() => { return <View style={{ marginLeft: 10 }}><Text style={{ color: '#000', fontSize: fontSizeHeading }}>{Platform.OS === "ios" ? null : "Back"}</Text></View> }} backButtonTextStyle={{ color: '#000' }} component={HofAllReview} back={true} backButtonTintColor={'#000'} backTitle="Back" />
                <Scene key="shoutoutsearch" navigationBarStyle={{ elevation: 0, fontFamily: "Roboto-Medium", backgroundColor: '#fff', borderBottomColor: 'transparent' }} renderTitle={() => { return <View style={{ marginLeft: 10 }}><Text style={{ color: '#000', fontSize: fontSizeHeading }}>{Platform.OS === "ios" ? null : "Back"}</Text></View> }} backButtonTextStyle={{ color: '#000' }} component={ShoutOutSearch} back={true} backButtonTintColor={'#000'} backTitle="Back" onBack={() => Actions.pop()} />

            </Scene>
        );
        return <Provider store={Store}><RouterWithRedux scenes={scenes} /></Provider>
    }
}



const styles = {
    indicatorStyle: {
        backgroundColor: '#000'
    },
    labelStyle: {
        backgroundColor: 'red'
    },
};