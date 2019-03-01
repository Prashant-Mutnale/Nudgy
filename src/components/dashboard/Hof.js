import React from "react";
import {
    TextInput,
    Text,
    TouchableOpacity,
    Image,
    View,
    StyleSheet,
    StatusBar,
    ScrollView,
    AsyncStorage,
    FlatList,
    ActivityIndicator
} from "react-native";
import { Actions } from "react-native-router-flux";
import styles from "./styles/style";
import colors from "../Elements/colors";
import RNPickerSelect from "react-native-picker-select";
import StarRating from "react-native-star-rating";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import { hof } from '../../redux/actions/Hof'
import { hof } from '../../redux/actions/Hallof'
import { connect } from 'react-redux'
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Ionicons";

let gettoken
let halldata = []
let loginId

class Hof extends React.Component {
    constructor(props) {
        super(props);
        this.inputRefs = {};
        this.state = {
            starCount: 2,
            hofdata: '',
            refreshing: false,
            lastupdated: 'present',
            favColor: undefined,
            selectmonth: 'Select the month',
            selecttextmonth: "present",
            modalVisable: false,
            thisMonth: false,
            lastMonth: false,
            overall: true,
            items: [
                {
                    label: "Last Month",
                    value: "last"
                },
                {
                    label: "This Month",
                    value: "present"
                },
                {
                    label: "All",
                    value: "all"
                }
            ]
        };
        this.selectpicker = this.selectpicker.bind(this);
        this.callfunction = this.callfunction.bind(this)
    }

    callfunction() {
        console.log("called data")
    }

    static onEnter() {
        // console.log("dasd")
        this.callfunction()
    }
    visableModal() {
        this.setState({
            modalVisable: true
        });
    }

    // componentWillUnmount() {
    //   console.log("hello");
    // }
    emptycontentlist = () => {
        return (
            <View style={{ marginTop: '50%' }}>
                <Text style={{ textAlign: 'center' }}>You don't have any reviews for now.</Text>
            </View>
        )
    }
    lastMonth() {
        this.setState({
            lastMonth: true,
            thisMonth: false,
            overall: false
        })
        this.setState({
            modalVisable: false
        })
        this.props.hof("present")
    }
    thisMonth() {
        this.setState({
            lastMonth: false,
            thisMonth: true,
            overall: false
        })
        this.setState({
            modalVisable: false
        })
        this.props.hof("last")
    }
    overall() {
        this.setState({
            lastMonth: false,
            thisMonth: false,
            overall: true
        })
        this.setState({
            modalVisable: false
        })
        this.props.hof("all")
    }

    method() {
        console.log("calledmethod")
    }

    selectpicker(value, index) {
        this.setState({
            lastupdated: value
        })
        this.props.hof(value)
        // this.props.onEnter(gettoken, value);
    }

    getAlert() {
        alert('getAlert from Child');
    }

    async componentDidMount() {
        const signindetails = await AsyncStorage.getItem("signindata")
        let parsedata = JSON.parse(signindetails)
        console.log("parsedata", parsedata.userData.id)
        loginId = parsedata.userData.id
        gettoken = parsedata.accessToken
        console.log("gettoken", gettoken)
        // this.props.hof(gettoken, this.state.lastupdated)
    }

    onRefresh() {
        this.setState({ refreshing: true }), this.props.hof(gettoken, this.state.lastupdated), this.setState({ refreshing: false })
    }
    callHofallReview(getid) {
        console.log("getid", getid)
        Actions.hofallreview({ getid: getid, getUpdatedMonth: this.state.lastMonth ? "last" : this.state.thisMonth ? "present" : "all" })
    }
    capitalize(text) {
        return text.replace(/\b\w/g, function (m) { return m.toUpperCase(); });
    }
    render() {
        if (!this.props.hofdatamain.hallOfFame) {
            return (
                <ActivityIndicator
                    animating={true}
                    style={[styles.indicator, styles.activityindicator]}
                    size="large"
                    color="#000"
                />
            );
        }
        console.log("maindata", this.props.hofdatamain.hallOfFame)
        let mainvalue = this.props.hofdatamain.hallOfFame.filter(function (obj) {
            console.log("obj", obj.id)
            return obj.id !== loginId;
        });
        console.log("mainvalue", mainvalue)
        return (
            <View style={styles.containerstyle}>
                <StatusBar backgroundColor="#000" barStyle="light-content" animated={true} />
                <View style={{
                    backgroundColor: '#000',
                    height: 35
                }}></View>
                <TouchableOpacity style={styles.monthPicker} activeOpacity={1} onPress={() => this.visableModal()}>
                    <View style={{ justifyContent: "center", flex: 3 }}>
                        <Text style={{ fontFamily: "Roboto-Regular", fontSize: 16 }}>{this.state.lastMonth ? "Last Month" : this.state.thisMonth ? "This Month" : "Overall"}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: 'flex-end' }}>
                        <Icon name="ios-arrow-down" size={30} color="#444444" />
                    </View>
                    {/* <RNPickerSelect
                        placeholder={{
                            label: "Select the Date",
                            value: "present"
                        }}
                        items={this.state.items}
                        // onValueChange={(value) => {
                        //     this.setState({
                        //         favColor: value,
                        //     });
                        // }}
                        onValueChange={(value, index) => this.selectpicker(value, index)}
                        // onUpArrow={() => {
                        //     this.inputRefs.name.focus();
                        // }}
                        // onDownArrow={() => {
                        //     this.inputRefs.picker2.togglePicker();
                        // }}
                        style={pickerSelectStyles}
                        value={this.state.favColor}
                        ref={el => {
                            this.inputRefs.picker = el;
                        }}
                    /> */}
                </TouchableOpacity>
                <View style={styles.HallListmain}>
                    <FlatList data={mainvalue}
                        showsVerticalScrollIndicator={false}
                        renderItem={(items) => {
                            // let reviewrating = items.item.finalRating
                            let reviewrating = Math.round(items.item.finalRating * 10) / 10;
                            // let finalrating = Math.round(reviewrating)
                            // let reviewrating = 3.5
                            console.log("imageurl", items.item.imageUrl)
                            let profilePic = items.item.imageUrl
                            return (
                                <TouchableOpacity style={styles.HallListCard} onPress={() => this.callHofallReview(items.item.id)}>
                                    <View style={styles.HallListAvatar}>
                                        <Image
                                            style={styles.HallListAvataimage}
                                            source={require("../../images/Oval.png")}
                                            source={{ uri: profilePic !== "" ? profilePic : 'https://cdn.pbrd.co/images/HOYTMfd.png' }}
                                        />
                                    </View>
                                    <View style={styles.HallListName}>
                                        <View style={styles.HallListRating}>
                                            <Text
                                                style={styles.HallListUser}>
                                                {this.capitalize(items.item.name)}
                                                {/* {items.item.name.charAt(0).toUpperCase() + items.item.name.slice(1)} */}
                                            </Text>
                                            <View style={styles.HallListStar}>
                                                <View>
                                                    <StarRating
                                                        disabled={true}
                                                        fullStarColor={
                                                            reviewrating >= 1 && reviewrating <= 1.5
                                                                ? "red"
                                                                : reviewrating >= 1.5 && reviewrating <= 2.2
                                                                    ? "red"
                                                                    : reviewrating >= 2.3 && reviewrating <= 2.7
                                                                        ? "#FFCD83"
                                                                        : reviewrating >= 2.8 && reviewrating <= 3.2
                                                                            ? "#FFCD83"
                                                                            : reviewrating >= 3.3 && reviewrating <= 3.7
                                                                                ? "#FFEB4E"
                                                                                : reviewrating >= 3.8 && reviewrating <= 4.2
                                                                                    ? "#CDEB76"
                                                                                    : reviewrating >= 4.3 && reviewrating <= 4.7
                                                                                        ? "#CDEB76"
                                                                                        : "#2AF98A"
                                                        }
                                                        maxStars={5}
                                                        // halfStarColor={"FFCD83"}
                                                        starSize={14}
                                                        emptyStar={"star"}
                                                        emptyStarColor={"#e9e9e9"}
                                                        rating={reviewrating}
                                                        starColor={"red"}
                                                    // selectedStar={(rating) => this.onStarRatingPress(rating)}
                                                    />
                                                </View>
                                                <View style={{ paddingLeft: 8 }}>
                                                    <Text style={{ fontSize: 13 }}>{reviewrating}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.HallListReview}>
                                            <Text
                                                style={styles.HallListReviewText}>{items.item.noOfReviews} Reveiws</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                        ListEmptyComponent={this.emptycontentlist}
                        keyExtractor={item => item.email}
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.onRefresh()}
                    />
                </View>
                <Modal onBackdropPress={() => this.setState({ modalVisable: false })} animationInTiming={500} animationOutTiming={500} isVisible={this.state.modalVisable} onRequestClose={() => this.closemodal()} style={styles.bottomModal} onSwipe={() => this.setState({ modalVisable: false })} swipeDirection="down">
                    <View style={styles.modalInnerContent}>
                        <View
                            style={{
                                backgroundColor: "#fff",
                                padding: 15,
                                paddingLeft: 30,
                                borderBottomWidth: 2,
                                borderBottomColor: "#f2f2f2",
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10
                            }}
                        >
                            <Text style={{ fontSize: 18, fontWeight: "500" }}>
                                Select Month
                          </Text>
                        </View>
                        <View style={{ flex: 1, backgroundColor: "#fff", }}>
                            <TouchableOpacity
                                onPress={() => this.lastMonth()}
                                style={this.state.lastMonth ? styles.selectMonthEnable : styles.selectMonthDisable}
                            >
                                <View style={{ flex: 3 }}>
                                    <Text style={{ fontSize: 16 }}>Last Month </Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    {this.state.lastMonth ? <Icon name="md-checkmark" size={30} color="#444444" /> : null}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={this.state.thisMonth ? styles.selectMonthEnable : styles.selectMonthDisable}
                                onPress={() => this.thisMonth()}
                            >
                                <View style={{ flex: 3 }}>
                                    <Text style={{ fontSize: 16 }}>This Month </Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    {this.state.thisMonth ? <Icon name="md-checkmark" size={30} color="#444444" /> : null}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={this.state.overall ? styles.selectMonthEnable : styles.selectMonthDisable}
                                onPress={() => this.overall()}
                            >
                                <View style={{ flex: 3 }}>
                                    <Text style={{ fontSize: 16 }}>Overall</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    {this.state.overall ? <Icon name="md-checkmark" size={30} color="#444444" /> : null}
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View >
        );
    }
}

const pickerSelectStyles = {
    inputIOS: {
        fontSize: 16,
        paddingTop: 0,
        paddingHorizontal: 8,
        paddingBottom: 0,
        borderBottomWidth: 0,
        borderColor: "#fff",
        // borderColor: '#fff',
        // borderRadius: 4,
        height: 50,
        backgroundColor: "white",
        color: "black"
    },
    inputAndroid: {
        // color: 'white',
        borderBottomWidth: 0,
        height: 50,
        borderBottomColor: "#fff",
    },
    underline: { borderBottomWidth: 0, borderBottomColor: "#fff", borderTopWidth: 0 }
};
// const stylesstar = StyleSheet.create({
//     backgroundColor: 'red'
// })

function mapStateToProps(state) {
    return {
        hofdatamain: state.halldata.halldata
    }
}

export default connect(mapStateToProps, { hof })(Hof);
// export default Hof;
