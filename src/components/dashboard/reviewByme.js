import React from "react";
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
  Alert,
  RefreshControl,
  ActivityIndicator,
  AppState,
} from "react-native";
import { Actions, Modal } from "react-native-router-flux";
import Entypo from "react-native-vector-icons/Entypo";
import styles from "./styles/style";
import colors from "../Elements/colors";
import RNPickerSelect from "react-native-picker-select";
import { connect } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import StarRating from "react-native-star-rating";
import CustomIcon from "../../utlis/Customicon";
import { recent } from "../../redux/actions/Recent";
import { getProjectid } from '../../redux/actions/projectId'
import { reviewstatus } from '../../redux/actions/Reviewstatus'
import { reviewByme } from '../../redux/actions/MyReviews'
import TimeAgo from "react-native-timeago";
let getdata = 0;
let itemslength;
let token;
let averageRound;
let datafilter;
let finalroundratings;
let gettoken;
let Arrayid
let joinId
class ReviewByme extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 4,
      starNew: 3,
      starLow: 5,
      lastupdated: 'all',
      loading: true,
      refreshing: false,
      appState: AppState.currentState,
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
          label: "Overall",
          value: "all"
        }
      ]
    };
    this.onRefresh = this.onRefresh.bind(this);
    this.handleAppStatehange = this.handleAppStatehange.bind(this)
    this.checkEmployee = this.checkEmployee.bind(this)
    // this.selectpicker = this.selectpicker.bind(this);
  }
  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backPressed);
  }
  //   componentDidMount(){
  //     AppState.addEventListener('change', this.handleAppStatehange);
  //     const signindetails = await AsyncStorage.getItem("signindata");
  //     let parsedata = JSON.parse(signindetails);
  //     gettoken = parsedata.accessToken;
  //    this.props.reviewByme(gettoken)
  //   }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStatehange);
    BackHandler.removeEventListener("hardwareBackPress", this.backPressed);
  }
  handleAppStatehange(appState) {
    console.log("appstate", appState)
  }
  backPressed = () => {
    if (Actions.currentScene == "Recent") {
      BackHandler.exitApp();
      //    Actions.Scene({ type: 'reset' })
      Actions.header({ type: "reset" });
      return true;
      // Actions.reset("Recent")
      // Actions.Recent({ type:'reset' })
    } else {
      console.log("otherscreen");
    }
  };
  // selectpicker(value, index) {
  //   this.setState({
  //     lastupdated: value
  //   })
  //   this.props.reviewByme(gettoken, value)
  // }
  emptycontentlist = () => {
    return (
      <View style={{ marginTop: 140 }}>
        <Text style={{ textAlign: "center" }}>
          You have not rated for anyone
        </Text>
      </View>
    );
  };
  async componentDidMount() {
    console.log("markdata", this.props.myReviewdatanew)
    const signindetails = await AsyncStorage.getItem("signindata");
    let parsedata = JSON.parse(signindetails);
    gettoken = parsedata.accessToken;
    this.props.reviewByme(gettoken, this.state.lastupdated)
  }
  renderItem(data) {
    return (
      <View>
        <Text>Looped</Text>
      </View>
    );
  }
  stoploading() {
    this.setState({
      loading: false
    });
  }
  checkEmployee() {
    this.props.projectiddata !== "" && this.props.projectiddata != undefined ?
      Arrayid = this.props.projectiddata.project.map(function (itemsid, id) {
        // console.log("itemsid", itemsid)
        return itemsid.id
      }).join("&")
      : null
    joinId = Arrayid
    console.log("joinId", joinId)
    this.props.reviewstatus(gettoken, joinId, "fromdashboard")
  }

  onRefresh() {
    this.setState({ refreshing: true }),
      this.props.recent(gettoken),
      this.setState({ refreshing: false });
  }
  componentWillReceiveProps(props) {
    console.log(this.props.param1);
  }
  capitalize(text) {
    return text.replace(/\b\w/g, function (m) { return m.toUpperCase(); });
  }
  render() {
    //   console.log("maje", this.props.myReviewdata)
    if (!this.props.myReviewdatanew) {
      return (
        <ActivityIndicator
          animating={true}
          style={[styles.indicator, styles.activityindicator]}
          size="large"
          color="#000"
        />
      );
    }

    return (
      <View style={styles.RecentContainernew}>
        {/* <StatusBar backgroundColor="#000" barStyle="light-content"/> */}
        <View style={{ marginTop: 10 }}>
          <FlatList
            data={this.props.myReviewdatanew}
            showsVerticalScrollIndicator={false}
            renderItem={(items, index) => {
              if (items.item.type == "shoutOut") {
                averageRound = parseInt(items.item.shoutOutRating);
                finalroundratings = Math.round(averageRound * 10) / 10;
              } else {
                let ratingdata = items.item.employeeRating;
                behaviour = ratingdata.behavior;
                skillLevel = ratingdata.skillLevel;
                communication = ratingdata.communication;
                dependability = ratingdata.dependability;
                let averageTotal =
                  parseInt(behaviour) +
                  parseInt(skillLevel) +
                  parseInt(communication) +
                  parseInt(dependability);
                let averageRating = averageTotal / 4;
                finalroundratings = Math.round(averageRating * 10) / 10;
              }
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    items.item.type == "review"
                      ? Actions.recentDetails({ employeeitem: items })
                      : null;
                  }}
                  style={styles.RecentCardsHolder}
                  key={index}
                >
                  <View style={styles.RecentAvatarName}>
                    <View style={styles.RecentAvatar}>
                      <Image
                        style={styles.RecentListAvataimage}
                        // source={require("../../images/Oval.png")}
                        source={{ uri: items.item.reviewTo.profilePic !== "" ? items.item.reviewTo.profilePic : 'https://cdn.pbrd.co/images/HOYTMfd.png' }}
                      />
                    </View>
                    <View style={styles.RecentNames}>
                      <Text style={styles.RecentNameText}>
                        {/* {items.item.reviewTo.name.charAt(0).toUpperCase() +
                          items.item.reviewTo.name.slice(1)} */}
                        {
                          this.capitalize(items.item.reviewTo.name)
                        }
                      </Text>
                      <View style={styles.RecentStartRatings}>
                        <StarRating
                          disabled={true}
                          fullStarColor={
                            finalroundratings < 1
                              ? "red"
                              : finalroundratings >= 1 && finalroundratings <= 1.5
                                ? "red"
                                : finalroundratings >= 1.5 &&
                                  finalroundratings <= 2.2
                                  ? "red"
                                  : finalroundratings >= 2.3 &&
                                    finalroundratings <= 2.7
                                    ? "#FFCD83"
                                    : finalroundratings >= 2.8 &&
                                      finalroundratings <= 3.2
                                      ? "#FFCD83"
                                      : finalroundratings >= 3.3 &&
                                        finalroundratings <= 3.7
                                        ? "#FFEB4E"
                                        : finalroundratings >= 3.8 &&
                                          finalroundratings <= 4.2
                                          ? "#CDEB76"
                                          : finalroundratings >= 4.3 &&
                                            finalroundratings <= 4.7
                                            ? "#CDEB76"
                                            : "#2AF98A"
                          }
                          maxStars={5}
                          starSize={14}
                          emptyStar={"star"}
                          emptyStarColor={"#e9e9e9"}
                          rating={finalroundratings}
                          starColor={"red"}
                        />

                        <View style={styles.RecentJustNowholder}>
                          <View style={{ flex: 4, marginLeft: 10 }}>
                            <Text style={{ fontSize: 12 }}>
                              {finalroundratings}
                            </Text>
                          </View>
                          <View style={{ flex: 0.5 }}>
                            <Entypo name="dot-single" size={15} color="#e9e9e9" />
                          </View>
                          <View style={{ flex: 12, width: 200 }}>
                            <Text style={styles.RecentJustnow}>
                              <TimeAgo time={items.item.createdAt} />
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={styles.RecentShoultout}>
                      {items.item.type == "shoutOut" ? (
                        <View style={styles.shoutOuticon}>
                          <MaterialCommunityIcons
                            name="bullhorn"
                            size={22}
                            color="#f88586"
                          />
                        </View>
                      ) : null}
                    </View>
                  </View>
                  <View>
                    <Text style={styles.RecentDescription}>
                      {items.item.reviewMessage}
                    </Text>
                  </View>
                  <View style={{
                    flexDirection: 'row'
                  }}>
                    {
                      items.item.anonymous == "true" || items.item.anonymous == "notAppilied" ? null : <View>
                        <MaterialCommunityIcons name='bullhorn' size={25} color="#4a4a4a" />
                      </View>
                    }

                    <Text style={{
                      marginTop: 2,
                      color: '#b1acac'
                    }}>

                      {
                        items.item.anonymous == "true" || items.item.anonymous == "notAppilied" ? null : <Text>By </Text>
                      }
                      {items.item.anonymous == "false" ? items.item.reviewBy.name : null}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.refreshing}
            ListEmptyComponent={this.emptycontentlist}
            keyExtractor={item => item.email}
          />
        </View>
        {/* <View style={styles.calenderHolder}>
      <MaterialCommunityIcons
      style={{
        position: 'absolute'
      }}
             name="calendar-range"
             size={22}
              color="#fff"
        />
                  <RNPickerSelect
                placeholder={{
                  // label: "Select a Month",
                  value: "present"
                }}
                hideIcon={true}
                items={this.state.items}
                // onValueChange={(value) => {
                //     this.setState({
                //         favColor: value,
                //     });
                // }}
                onValueChange={(value, index) =>
                  this.selectpicker(value, index)
                }
                // onUpArrow={() => {
                //     this.inputRefs.name.focus();
                // }}
                // onDownArrow={() => {
                //     this.inputRefs.picker2.togglePicker();
                // }}
                style={pickerSelectStyles}
                value={this.state.favColor}
              // ref={(el) => {
              //     this.inputRefs.picker = el;
              // }}
              />
      </View> */}
      </View>
    );
  }
}


const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingTop: 8,
    paddingHorizontal: 8,
    paddingBottom: 8,
    borderBottomWidth: 0,
    borderColor: "#fff",
    // borderColor: '#fff',
    // borderRadius: 4,
    backgroundColor: "transparent",
    color: "transparent"
  },
  inputAndroid: {
    // color: 'white',
    borderBottomWidth: 0,
    borderBottomColor: "#fff",
  },
  underline: { borderBottomWidth: 0, borderBottomColor: "#fff", borderTopWidth: 0 },
  absolute: {
    position: "absolute",
    backgroundColor: "red",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
};


function mapStateToProps(state) {
  console.log("madestate", state.myreviewdata.reviebymedata.reviewList)
  return {
    myReviewdata: state.myreviewdata.reviebymedata.reviewList
  };
}

export default connect(
  mapStateToProps,
  { recent, reviewByme }
)(ReviewByme);
