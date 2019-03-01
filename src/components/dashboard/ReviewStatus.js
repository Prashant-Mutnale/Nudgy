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
    ScrollView,
    AsyncStorage,
    FlatList,
    BackHandler,
    Keyboard,
    ActivityIndicator
} from 'react-native';
import { Actions, NavigationActions } from 'react-native-router-flux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import styles from './styles/style'
import colors from '../Elements/colors'
import { connect } from 'react-redux'
import { reviewstatus } from '../../redux/actions/Reviewstatus'

let Arrayid
let joinId
let gettoken
let projectArray = []
class ReviewStatus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            refreshing: false,
        }
        this.onRefresh = this.onRefresh.bind(this)
        // this.getEmployeeDetails = this.getEmployeeDetails.bind(this)
    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backPressed);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    }
    backPressed = () => {
        console.log("get current screen", Actions.currentScene)
        if (Actions.currentScene == "ReviewStatus") {
            console.log("yes this screen")
            Actions.popTo("Recent");
            return true
            // this.props.navigation.goBack();
            // // Actions.reset('writeReview')

        }
        else {
            console.log("otherscreen")
            console.log("indexdata", Actions.state.index)
            // if( Actions.state.index == 5){
            //     return true
            // }

        }
    }
    componentWillUnmount() {
        console.log("alert")
    }
    async componentDidMount() {
        Keyboard.dismiss()
        console.log("gotprops", this.props.from)
        const signindetails = await AsyncStorage.getItem("signindata")
        let parsedata = JSON.parse(signindetails)
        console.log("makeit", this.props.projectiddata.project)
        gettoken = parsedata.accessToken
        let projectiddata = this.props.projectiddata

        this.props.projectiddata !== "" && this.props.projectiddata != undefined ?
            Arrayid = this.props.projectiddata.project.map(function (itemsid, id) {
                // console.log("itemsid", itemsid)
                return itemsid.id
            }).join("&")
            : null
        console.log("Arrayid", Arrayid)
        joinId = Arrayid
        this.props.reviewstatus(gettoken, joinId)
    }
    emptycontentlist = () => {
        return (
            <View style={{ marginTop: "50%", marginBottom: '50%' }}>

                <Text style={{ textAlign: 'center' }}> Sorry, No Data Present</Text>

            </View>
        )
    }
    componentWillReceiveProps(props) {
        console.log('component: componentWillReceiveProps');
        console.log(props);
    }
    capitalize(text) {
        return text.replace(/\b\w/g, function (m) { return m.toUpperCase(); });
    }
    onRefresh() {
        // this.setState({ refreshing: true });
        // this.props.recent(gettoken).then(() => {
        //     this.setState({ refreshing: false });
        // });
        this.setState({ refreshing: true }), this.props.reviewstatus(gettoken, joinId), this.setState({ refreshing: false })

    }
    stoploading() {
        this.setState({
            loading: false
        })
    }
    // getEmployeeDetails(getdetails) {
    //     console.log("getEmployeeDetails", getdetails.item.project)
    //     var str = getdetails.item.project.map(function (elem) {
    //         return elem.name;
    //     }).join(",");
    //     console.log("str", str)
    // }
    render() {
        console.log("datauser", this.props.reviewstatusdata)
        if (!this.props.reviewstatusdata) {
            return (
                <ActivityIndicator
                    animating={true}
                    style={[styles.indicator, styles.activityindicator]}
                    size="large"
                />
            );
        }
        return (
            <View style={{ flexDirection: 'column', flex: 1 }}>
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                {/* <View style={styles.WriteReview}>
                    <View style={styles.writeReviewicon}>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <View style={styles.WriteReviewCircle}>
                                <Image
                                    style={styles.WriteReviewAlign}
                                    source={require('../../images/star.png')}
                                />
                            </View>
                            <View style={styles.ReviewText}>
                                <Text>Write review for</Text>
                            </View>
                        </View>
                    </View>
                </View> */}
                <View style={[styles.HallList, styles.Reviewfor]}>
                    <FlatList data={this.props.reviewstatusdata.employees}
                        showsVerticalScrollIndicator={false}
                        renderItem={(items) => {
                            console.log("itemsreview", items.item.profilePic)
                            // var str = [{ name: "Joe", age: 22 },
                            // { name: "Kevin", age: 24 },
                            // { name: "Peter", age: 21 }
                            // ].map(function (elem) {
                            //     return elem.name;
                            // }).join("&");
                            // console.log("str", str)
                            var strmain = items.item.project.map(function (elem) {
                                return elem.name;
                            }).join(",");
                            console.log("strmain", strmain)
                            return (
                                <TouchableOpacity activeOpacity={1} style={styles.HallListCard}
                                    // onPress={() => this.getEmployeeDetails(items)}
                                    onPress={() => Actions.writeReview({ userid: items.item.id, projectid: items.item.project[0].id, usernamedata: items.item.name, projectname: strmain, profilePic: items.item.profilePic })}
                                >
                                    <View style={styles.HallListAvatar}>
                                        <Image
                                            style={styles.HallListAvataimage}
                                            source={require('../../images/Oval.png')}
                                            source={{ uri: items.item.profilePic !== "" ? items.item.profilePic : 'https://cdn.pbrd.co/images/HOYTMfd.png' }}
                                        />
                                    </View>
                                    <View style={styles.HallListName}>
                                        <View style={styles.HallListRating}>
                                            <Text style={styles.HallListUser}>
                                                {
                                                    this.capitalize(items.item.name)
                                                }
                                            </Text>
                                            {/* <Text style={styles.HallListUser}>{items.item.name.charAt(0).toUpperCase() + items.item.name.slice(1)}</Text> */}
                                            <View style={styles.HallListStar}>
                                                {/* <Text>Project:</Text> */}
                                                {/* {
                                                items.item.project.map((projectitem, pit)=>{
                                                    projectArray.push(projectitem.name)
                                                    console.log("projectArray",projectArray)
                                                    return(
                                                        <Text key ={pit}>{projectitem.name}{items.item.project.length>1?',':null}</Text>
                                                    )
                                                })
                                            } */}
                                                <Text>Project: <Text>{strmain}</Text></Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                        ListEmptyComponent={this.emptycontentlist}
                        keyExtractor={item => item.email}
                        onRefresh={() => this.onRefresh()}
                        refreshing={this.state.refreshing}
                    />
                </View>
                {/* <TouchableOpacity style={styles.ManagementBar} onPress={() => Actions.sharefeedback()} activeOpacity={1}>
                    <View style={styles.statusprofileICon}><MaterialIcons name="person" size={30} color="#4a90e2" /></View>
                    <View style={styles.statusprofiledescription}><Text style={styles.statusprofiledescriptiontext}>Share you'r feedback to the management</Text></View>
                </TouchableOpacity> */}
            </View>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        reviewstatusdata: state.reviewstatusdata.reviewstatusdata,
        projectiddata: state.projectiddata.projectiddata.employeeProject
    }
}

export default connect(mapStateToProps, { reviewstatus })(ReviewStatus);