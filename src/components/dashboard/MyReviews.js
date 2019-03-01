import React from "react";
import {
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  findNodeHandle,
  StatusBar,
  AsyncStorage,
  ActivityIndicator,
  RefreshControl,
  BackHandler
} from "react-native";
import { Actions } from "react-native-router-flux";
import Octicons from "react-native-vector-icons/Octicons";
import styles from "./styles/style";
import RNPickerSelect from "react-native-picker-select";
import colors from "../Elements/colors";
import StarRating from "react-native-star-rating";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { myreviews } from '../../redux/actions/MyReviews'
import { getProjectid } from '../../redux/actions/projectId'
import { reviewstatus } from '../../redux/actions/Reviewstatus'
import { hrRating } from '../../redux/actions/MyReviews'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux'
import Entypo from 'react-native-vector-icons/Entypo'
import TimeAgo from 'react-native-timeago';
let reviewedstatus
let avaragerating
let behaviourfinal
let skillLevelfinal
let communicationfinal
let dependabilityfinal
let gettoken
let getid
let behaviouralround
let skillround
let communicationround
let dependablityround
let finalratinggot
let finalroundrating
let nameiduser
let behavior = 0
let skillLevel = 0
let communication = 0
let dependability = 0
let avrg = 0;
let gotlength
let overallrating
let username
let averagetextrating
let nerating
let average = 0
let behaviorAvg = 0
let skillLevelAvg = 0
let dependabilityAvg = 0
let communicationAvg = 0
let ratingaverage
let loginname
let behaviorFinal = 0
let skillFinal = 0
let communicationFinal = 0
let dependablityFinal = 0
let Arrayid
let joinId
let profilePic
let messageRound
let mainvalue
let previousDateNumber
class MyReviews extends React.Component {
  constructor(props) {
    super(props);
    this.getemployerating = ""
    this.behavior = 0
    this.skillLevel = 0
    this.communication = 0
    this.dependability = 0
    this.behaviorFinal = 0
    this.skillFinal = 0
    this.communicationFinal = 0
    this.dependablityFinal = 0
    this.average = 0
    this.hrrating = 0
    this.state = {
      viewRef: null,
      starCount: 3,
      favColor: undefined,
      lastupdated: 'all',
      refreshing: false,
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
    this.selectpicker = this.selectpicker.bind(this);
    this.checkEmployees = this.checkEmployees.bind(this)
  }
  _onRefresh = () => {
    this.setState({ refreshing: true }), this.props.myreviews(gettoken, getid, this.state.lastupdated), this.setState({ refreshing: false })
  }
  selectpicker(value, index) {
    this.setState({
      lastupdated: value
    })
    this.props.myreviews(gettoken, getid, value)
    this.props.hrRating(gettoken, getid, value)
  }
  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }

  async componentDidMount() {
    console.log("getDate", this.props.getDate)
    let getDate = new Date()
    let previousDate = getDate.toString().split(" ")
    previousDateNumber = previousDate[2]
    const signindetails = await AsyncStorage.getItem("signindata")
    let parsedata = JSON.parse(signindetails)
    gettoken = parsedata.accessToken
    getid = parsedata.userData.id
    loginname = parsedata.userData.name.charAt(0).toUpperCase() + parsedata.userData.name.slice(1)
    this.props.myreviews(gettoken, getid, this.state.lastupdated)
    this.props.getProjectid(gettoken)
    this.props.hrRating(gettoken, getid, this.state.lastupdated)
    console.log("getDate", this.props.getDate)
  }
  checkEmployees() {
    this.props.projectiddata !== "" && this.props.projectiddata != undefined ?
      Arrayid = this.props.projectiddata.project.map(function (itemsid, id) {
        return itemsid.id
      }).join("&")
      : null
    joinId = Arrayid
    if (previousDateNumber >= 26 || previousDateNumber <= 3) {
      this.props.reviewstatus(gettoken, joinId, "frommyreview")
    }
    else {
      Toast.show('You cannot review for this month');
    }
  }
  componentWillReceiveProps(nextProps) {
    this.behavior = 0
    this.skillLevel = 0
    this.communication = 0
    this.dependability = 0
    this.behaviorFinal = 0
    this.skillFinal = 0
    this.communicationFinal = 0
    this.dependablityFinal = 0
    this.average = 0
    this.hrtotal = 0

    if (nextProps.myreviewdata !== undefined && nextProps.myreviewdata !== "") {
      let getlength = nextProps.myreviewdata.data
      gotlength = getlength.length
      nextProps.myreviewdata.data !== "" && nextProps.myreviewdata.data !== undefined ?
        nextProps.myreviewdata.data.map((items, i) => {
          if (gotlength >= 1 && items.employeeRating !== null) {
            username = items.reviewTo.name
            profilePic = items.reviewTo.profilePic
            // this.behavior = 0
            // this.skillLevel = 0  
            // this.communication = 0
            // this.dependability = 0
            this.behavior = this.behavior + parseInt(items.employeeRating.behavior)
            console.log("behavournew", this.behavior)
            this.skillLevel = this.skillLevel + parseInt(items.employeeRating.skillLevel);
            this.communication = this.communication + parseInt(items.employeeRating.communication);
            this.dependability = this.dependability + parseInt(items.employeeRating.dependability);
          }
          else {
            null
          }
        })
        : null
      if (gotlength >= 1) {
        mainvalue = nextProps.myreviewdata.data.filter(function (obj) {
          // console.log("obj", obj.type)
          return obj.type !== "shoutOut";
        });
        if (nextProps.hrData !== false) {
          this.behavior = this.behavior / mainvalue.length;
          this.skillLevel = this.skillLevel / mainvalue.length;
          this.communication = this.communication / mainvalue.length;
          this.dependability = this.dependability / mainvalue.length;
          this.hrtotal = ((nextProps.hrData.absenteeism + nextProps.hrData.workCulture + nextProps.hrData.punctuality) / 3) / mainvalue.length
          console.log("gettotal", this.hrtotal)
          this.average = Math.round((this.behavior + this.skillLevel + this.communication + this.dependability + this.hrtotal) / 5 * 10) / 10;
          this.behaviorFinal = Math.round(this.behavior * 10) / 10;
          this.skillFinal = Math.round(this.skillLevel * 10) / 10;
          this.communicationFinal = Math.round(this.communication * 10) / 10;
          this.dependabilityFinal = Math.round(this.dependability * 10) / 10;
        }
        else {
          this.behavior = this.behavior / mainvalue.length;
          this.skillLevel = this.skillLevel / mainvalue.length;
          this.communication = this.communication / mainvalue.length;
          this.dependability = this.dependability / mainvalue.length;
          this.average = Math.round((this.behavior + this.skillLevel + this.communication + this.dependability) / 4 * 10) / 10;
          this.behaviorFinal = Math.round(this.behavior * 10) / 10;
          this.skillFinal = Math.round(this.skillLevel * 10) / 10;
          this.communicationFinal = Math.round(this.communication * 10) / 10;
          this.dependabilityFinal = Math.round(this.dependability * 10) / 10;
        }
      }
      else {
        null
      }
    }
  }

  capitalize(text) {
    return text.replace(/\b\w/g, function (m) { return m.toUpperCase(); });
  }

  render() {
    console.log("getDateprops", this.props.getDate)
    reviewedstatus = this.props.myreviewdata.reviewed
    console.log("reviewedstatus", reviewedstatus)
    if (this.props.hrData) {
      hrratingsec = (this.props.hrData.workCulture + this.props.hrData.punctuality + this.props.hrData.absenteeism) / 3
      this.hrrating = Math.round(hrratingsec * 10) / 10;
    }

    // var str = [{ name: "Joe", age: 22 },
    // { name: "Kevin", age: 24 },
    // { name: "Peter", age: 21 }
    // ].map(function (elem) {
    //   return elem.name;
    // }).join("&");
    // console.log("str", str)
    if (!this.props.myreviewdata.data) {
      return (
        <ActivityIndicator
          animating={true}
          style={[styles.indicator, styles.activityindicator]}
          size="large"
          color="#000"
        />
      );
    }
    this.getemployerating = this.props.myreviewdata.data
    return (
      <View style={{
        flex: 1
      }}>

        <View style={{ flex: 1 }}>
          <View style={styles.containerstyle} refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
            {
              gotlength >= 1 ? <View>
                <View style={[styles.HallList, styles.margin10]}>
                  <View style={styles.reviewListing}>
                    <View style={styles.HallListAvatar}>
                      <Image
                        style={styles.HallListAvataimage}
                        source={{ uri: profilePic !== "" ? profilePic : 'https://cdn.pbrd.co/images/HOYTMfd.png' }}
                      />
                    </View>
                    <View style={[styles.HallListName, styles.removeBorderReveiw]}>
                      <View style={styles.HallListRating}>
                        <Text style={styles.HallListUser}> {this.capitalize(loginname)}</Text>
                        <View style={styles.HallListStar}>
                          <StarRating
                            disabled={true}

                            fullStarColor={
                              this.average >= 1 && this.average <= 1.5
                                ? "red"
                                : this.average >= 1.5 && this.average <= 2.2
                                  ? "red"
                                  : this.average >= 2.3 && this.average <= 2.7
                                    ? "#FFCD83"
                                    : this.average >= 2.8 && this.average <= 3.2
                                      ? "#FFCD83"
                                      : this.average >= 3.3 && this.average <= 3.7
                                        ? "#FFEB4E"
                                        : this.average >= 3.8 && this.average <= 4.2
                                          ? "#CDEB76"
                                          : this.average >= 4.3 && this.average <= 4.7
                                            ? "#CDEB76"
                                            : "#2AF98A"
                            }
                            maxStars={5}
                            starSize={14}
                            emptyStar={"star"}
                            emptyStarColor={"#e9e9e9"}
                            rating={this.average}
                            starColor={"red"}
                          // selectedStar={(rating) => this.onStarRatingPress(rating)}
                          />
                          <View style={{ marginLeft: 10, fontSize: 12 }}><Text>{this.average}</Text></View>
                        </View>

                      </View>
                      <View style={styles.HallListReview}>
                        <Text style={styles.HallListReviewText}>{gotlength} Reveiws</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.writeReviewRatingSection}>
                  <View style={styles.writeReviewRatingSectiontitle}>
                    <View style={styles.writeReviewRatingSectionRatingTitle}>
                      <Text style={styles.writeReviewRatingSectionRatingTitleWord}>
                        Behavior
                  </Text>
                    </View>
                    <View style={styles.changestar}>
                      <StarRating
                        disabled={true}
                        fullStarColor={
                          this.behaviorFinal >= 1 && this.behaviorFinal <= 1.5
                            ? "red"
                            : this.behaviorFinal >= 1.5 && this.behaviorFinal <= 2.2
                              ? "red"
                              : this.behaviorFinal >= 2.3 && this.behaviorFinal <= 2.7
                                ? "#FFCD83"
                                : this.behaviorFinal >= 2.8 && this.behaviorFinal <= 3.2
                                  ? "#FFCD83"
                                  : this.behaviorFinal >= 3.3 && this.behaviorFinal <= 3.7
                                    ? "#FFEB4E"
                                    : this.behaviorFinal >= 3.8 && this.behaviorFinal <= 4.2
                                      ? "#CDEB76"
                                      : this.behaviorFinal >= 4.3 && this.behaviorFinal <= 4.7
                                        ? "#CDEB76"
                                        : "#2AF98A"
                        }
                        maxStars={5}
                        starSize={14}
                        emptyStar={"star"}
                        emptyStarColor={"#e9e9e9"}
                        rating={this.behaviorFinal}
                      // selectedStar={(rating) => this.onStarRatingPress(rating)}
                      />
                    </View>
                    <View style={styles.number}>
                      <Text style={styles.numberText}>{this.behaviorFinal}</Text>
                    </View>
                  </View>

                  <View style={styles.writeReviewRatingSectiontitle}>
                    <View style={styles.writeReviewRatingSectionRatingTitle}>
                      <Text style={styles.writeReviewRatingSectionRatingTitleWord}>
                        Skill Level
                  </Text>
                    </View>
                    <View style={styles.changestar}>
                      <StarRating
                        disabled={true}
                        fullStarColor={
                          this.skillFinal >= 1 && this.skillFinal <= 1.5
                            ? "red"
                            : this.skillFinal >= 1.5 && this.skillFinal <= 2.2
                              ? "red"
                              : this.skillFinal >= 2.3 && this.skillFinal <= 2.7
                                ? "#FFCD83"
                                : this.skillFinal >= 2.8 && this.skillFinal <= 3.2
                                  ? "#FFCD83"
                                  : this.skillFinal >= 3.3 && this.skillFinal <= 3.7
                                    ? "#FFEB4E"
                                    : this.skillFinal >= 3.8 && this.skillFinal <= 4.2
                                      ? "#CDEB76"
                                      : this.skillFinal >= 4.3 && this.skillFinal <= 4.7
                                        ? "#CDEB76"
                                        : "#2AF98A"
                        }
                        maxStars={5}
                        starSize={14}
                        emptyStar={"star"}
                        emptyStarColor={"#e9e9e9"}
                        rating={this.skillFinal}
                      // selectedStar={(rating) => this.onStarRatingPress(rating)}
                      />
                    </View>
                    <View style={styles.number}>
                      <Text style={styles.numberText}>{this.skillFinal}</Text>
                    </View>
                  </View>

                  <View style={styles.writeReviewRatingSectiontitle}>
                    <View style={styles.writeReviewRatingSectionRatingTitle}>
                      <Text style={styles.writeReviewRatingSectionRatingTitleWord}>
                        Analytical
                  </Text>
                    </View>
                    <View style={styles.changestar}>
                      <StarRating
                        disabled={true}
                        fullStarColor={
                          this.communicationFinal < 1 ? "red" :
                            this.communicationFinal >= 1 && this.communicationFinal <= 1.5
                              ? "red"
                              : this.communicationFinal >= 1.5 && this.communicationFinal <= 2.2
                                ? "red"
                                : this.communicationFinal >= 2.3 && this.communicationFinal <= 2.7
                                  ? "#FFCD83"
                                  : this.communicationFinal >= 2.8 && this.communicationFinal <= 3.2
                                    ? "#FFCD83"
                                    : this.communicationFinal >= 3.3 && this.communicationFinal <= 3.7
                                      ? "#FFEB4E"
                                      : this.communicationFinal >= 3.8 && this.communicationFinal <= 4.2
                                        ? "#CDEB76"
                                        : this.communicationFinal >= 4.3 && this.communicationFinal <= 4.7
                                          ? "#CDEB76"
                                          : "#2AF98A"
                        }
                        maxStars={5}
                        starSize={14}
                        emptyStar={"star"}
                        emptyStarColor={"#e9e9e9"}
                        rating={this.communicationFinal}
                      // selectedStar={(rating) => this.onStarRatingPress(rating)}
                      />
                    </View>
                    <View style={styles.number}>
                      <Text style={styles.numberText}>{this.communicationFinal}</Text>
                    </View>
                  </View>

                  <View style={styles.writeReviewRatingSectiontitle}>
                    <View style={styles.writeReviewRatingSectionRatingTitle}>
                      <Text style={styles.writeReviewRatingSectionRatingTitleWord}>
                        Dependability
                  </Text>
                    </View>
                    <View style={styles.changestar}>
                      <StarRating
                        disabled={true}
                        fullStarColor={
                          this.dependabilityFinal >= 1 && this.dependabilityFinal <= 1.5
                            ? "red"
                            : this.dependabilityFinal >= 1.5 && this.dependabilityFinal <= 2.2
                              ? "red"
                              : this.dependabilityFinal >= 2.3 && this.dependabilityFinal <= 2.7
                                ? "#FFCD83"
                                : this.dependabilityFinal >= 2.8 && this.dependabilityFinal <= 3.2
                                  ? "#FFCD83"
                                  : this.dependabilityFinal >= 3.3 && this.dependabilityFinal <= 3.7
                                    ? "#FFEB4E"
                                    : this.dependabilityFinal >= 3.8 && this.dependabilityFinal <= 4.2
                                      ? "#CDEB76"
                                      : this.dependabilityFinal >= 4.3 && this.dependabilityFinal <= 4.7
                                        ? "#CDEB76"
                                        : "#2AF98A"
                        }
                        maxStars={5}
                        starSize={14}
                        emptyStar={"star"}
                        emptyStarColor={"#e9e9e9"}
                        rating={this.dependabilityFinal}
                      // selectedStar={(rating) => this.onStarRatingPress(rating)}
                      />
                    </View>
                    <View style={styles.number}>
                      <Text style={styles.numberText}>{this.dependabilityFinal}</Text>
                    </View>
                  </View>
                  {
                    this.props.hrData ? <View style={styles.writeReviewRatingSectiontitle}>
                      <View style={styles.writeReviewRatingSectionRatingTitle}>
                        <Text style={styles.writeReviewRatingSectionRatingTitleWord}>
                          Work Culture
                  </Text>
                      </View>
                      <View style={styles.changestar}>
                        <StarRating
                          disabled={true}
                          fullStarColor={
                            this.hrrating >= 1 && this.hrrating <= 1.5
                              ? "red"
                              : this.hrrating >= 1.5 && this.hrrating <= 2.2
                                ? "red"
                                : this.hrrating >= 2.3 && this.hrrating <= 2.7
                                  ? "#FFCD83"
                                  : this.hrrating >= 2.8 && this.hrrating <= 3.2
                                    ? "#FFCD83"
                                    : this.hrrating >= 3.3 && this.hrrating <= 3.7
                                      ? "#FFEB4E"
                                      : this.hrrating >= 3.8 && this.hrrating <= 4.2
                                        ? "#CDEB76"
                                        : this.hrrating >= 4.3 && this.hrrating <= 4.7
                                          ? "#CDEB76"
                                          : "#2AF98A"
                          }
                          maxStars={5}
                          starSize={14}
                          emptyStar={"star"}
                          emptyStarColor={"#e9e9e9"}
                          rating={this.hrrating}
                        // selectedStar={(rating) => this.onStarRatingPress(rating)}
                        />
                      </View>
                      <View style={styles.number}>
                        <Text style={styles.numberText}>{this.hrrating}</Text>
                      </View>
                    </View> : null
                  }

                </View>
                <View style={styles.ReviewHead}>
                  <Text style={styles.ReviewHeadText}>Review</Text>
                </View>
                {
                  this.props.myreviewdata.data !== "" && this.props.myreviewdata.data !== undefined ?
                    this.props.myreviewdata.data.map((itemstext, itext) => {
                      if (itemstext.type == "review") {
                        console.log("itemstext", itemstext.employeeRating)
                        // this.getemployerating = itemstext
                        let messageRatings = itemstext.employeeRating
                        let messageBehaviour = parseInt(messageRatings.behavior)
                        let messageSkill = parseInt(messageRatings.skillLevel)
                        let messageCommunication = parseInt(messageRatings.communication)
                        let messageDependability = parseInt(messageRatings.dependability)
                        let averageMessage = (messageBehaviour + messageSkill + messageCommunication + messageDependability) / 5
                        messageRound = Math.round(averageMessage * 10) / 10;
                        console.log("messageRound", messageRound)
                        console.log("averageMessage", averageMessage)
                      }
                      else {
                        messageRound = itemstext.shoutOutRating
                        console.log("shoutout", messageRound)
                      }
                      return (
                        <View key={itext} style={styles.ReadReviewCard}>
                          <View style={styles.ReadReviewCardRating}>
                            <StarRating
                              disabled={true}
                              maxStars={5}
                              starSize={14}
                              emptyStar={"star"}
                              emptyStarColor={"#e9e9e9"}
                              fullStarColor={
                                messageRound < 1 ? "red" :
                                  messageRound >= 1 && messageRound <= 1.5
                                    ? "red"
                                    : messageRound >= 1.5 && messageRound <= 2.2
                                      ? "red"
                                      : messageRound >= 2.3 && messageRound <= 2.7
                                        ? "#FFCD83"
                                        : messageRound >= 2.8 && messageRound <= 3.2
                                          ? "#FFCD83"
                                          : messageRound >= 3.3 && messageRound <= 3.7
                                            ? "#FFEB4E"
                                            : messageRound >= 3.8 && messageRound <= 4.2
                                              ? "#CDEB76"
                                              : messageRound >= 4.3 && messageRound <= 4.7
                                                ? "#CDEB76"
                                                : "#2AF98A"
                              }
                              maxStars={5}
                              starSize={14}
                              rating={messageRound}
                            // selectedStar={(rating) => this.onStarRatingPress(rating)}
                            />
                            <View><Entypo name="dot-single" size={15} color="#e9e9e9" /></View>
                            <View><Text style={styles.RecentJustnow}><TimeAgo time={itemstext.createdAt} /></Text></View>
                          </View>

                          <View style={styles.ReviewCardDescription}>
                            <View>
                              <Text>
                                {itemstext.reviewMessage}
                              </Text>
                            </View>
                            <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                              {itemstext.type == "shoutOut" ?
                                <View style={styles.shoutOuticon}>
                                  <MaterialCommunityIcons
                                    name="bullhorn"
                                    size={22}
                                    color="#000"
                                  />
                                </View> : null}
                            </View>
                          </View>
                          {/* {
                            !reviewedstatus ? <TouchableOpacity style={{
                              position: "absolute",
                              left: 0,
                              right: 0,
                              bottom: 0,
                              top: 0,
                            }}
                              activeOpacity={1} onPress={() => this.checkEmployees()}>
                              <Image
                                style={{
                                  flexShrink: 1,
                                  flex: 1,
                                  width: null
                                }}
                                source={require("../../images/whiteblur.jpg")}
                              />
                              <View style={styles.ReviewOverlay}>
                                <MaterialIcons name="lock" size={30} color="#000" />
                                <Text style={{ fontFamily: "Roboto-Regular", fontWeight: '400', color: '#000' }}>Write Review to read this</Text>
                              </View>
                            </TouchableOpacity>
                              : null
                          } */}

                        </View>
                      )
                    })
                    : null
                }
              </View> : <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 150 }}><Text style={{ textAlign: 'center' }}> You don't have any reviews for now.</Text></View>
            }
          </View>
        </View>
        {/* <View style={styles.calenderHolder}>
      <MaterialCommunityIcons
      style={{
        position: 'absolute',
      }}
             name="calendar-range"
             size={22}
              color="#fff"
        />
                  <RNPickerSelect
                placeholder={{
                  label: "",
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
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "rgba(255, 255, 255, 0)"
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
  },
};


function mapStateToProps(state) {
  return {
    myreviewdata: state.myreviewdata.myreviewdata,
    hrData: state.myreviewdata.hrdata.reviewList,
    projectiddata: state.projectiddata.projectiddata.employeeProject
  }
}


export default connect(mapStateToProps, { myreviews, getProjectid, reviewstatus, hrRating })(MyReviews);