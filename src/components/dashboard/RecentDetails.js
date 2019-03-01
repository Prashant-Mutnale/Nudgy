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
import { recentDetails } from '../../redux/actions/Recent'
import { myreviews } from '../../redux/actions/MyReviews'
import { connect } from 'react-redux'
import Entypo from 'react-native-vector-icons/Entypo'
import TimeAgo from 'react-native-timeago';
let reviewedstatus
let gettoken
let messageRound = 0
let behaviour = 0
let communication = 0
let dependability = 0
let skillLevel = 0
let finalroundratings = 0
let username
class RecentDetails extends React.Component {
  constructor(props) {
    super(props);
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
      lastupdated: 'present',
      refreshing: false,
      behaviour: 0,
      skillLevel: 0,
      dependablity: 0,
      communication: 0,
      finalrating: 0,
      username: '',
      message: '',
      items: [
        {
          label: "Last Month",
          value: "last"
        },
        {
          label: "This Month",
          value: "present"
        }
      ]
    };
  }
  capitalize(text) {
    return text.replace(/\b\w/g, function (m) { return m.toUpperCase(); });
  }
  componentDidMount() {
    console.log("gotrecentid", this.props.employeeitem.item)
    let dataitems = this.props.employeeitem.item
    behaviour = dataitems.employeeRating.behavior
    console.log("finma", this.props.avaragerating)
    this.setState({
      behaviour: dataitems.employeeRating.behavior,
      skillLevel: dataitems.employeeRating.skillLevel,
      communication: dataitems.employeeRating.communication,
      dependability: dataitems.employeeRating.dependability,
      username: dataitems.reviewTo.name,
      message: dataitems.reviewMessage
    })
  }
  // componentWillReceiveProps(nextProps){
  //     // console.log("nextProps", nextProps.myreviewdata.data)

  //     if (nextProps.myreviewdata !== undefined && nextProps.myreviewdata !== "") {
  //         let getlength = nextProps.myreviewdata.data
  //         gotlength = getlength.length
  //         nextProps.myreviewdata.data !== "" && nextProps.myreviewdata.data !== undefined ?
  //           nextProps.myreviewdata.data.map((items, i) => {
  //             if (gotlength >= 1) {
  //               username = items.reviewTo.name
  //               // this.behavior = 0
  //               // this.skillLevel = 0  
  //               // this.communication = 0
  //               // this.dependability = 0
  //               this.behavior = this.behavior + parseInt(items.employeeRating.behavior)
  //               console.log("behavournew", this.behavior)
  //               this.skillLevel = this.skillLevel + parseInt(items.employeeRating.skillLevel);
  //               this.communication = this.communication + parseInt(items.employeeRating.communication);
  //               this.dependability = this.dependability + parseInt(items.employeeRating.dependability);
  //             }
  //             else {
  //               null
  //             }
  //           })
  //           : null
  //         if (gotlength >= 1) {
  //           this.behavior = this.behavior / nextProps.myreviewdata.data.length;
  //           this.skillLevel = this.skillLevel / nextProps.myreviewdata.data.length;
  //           this.communication = this.communication / nextProps.myreviewdata.data.length;
  //           this.dependability = this.dependability / nextProps.myreviewdata.data.length;
  //           this.average = Math.round((this.behavior + this.skillLevel + this.communication + this.dependability) / 4 * 10) / 10;
  //           this.behaviorFinal = Math.round(this.behavior * 10) / 10;
  //           this.skillFinal = Math.round(this.skillLevel * 10) / 10;
  //           this.communicationFinal = Math.round(this.communication * 10) / 10;
  //           this.dependabilityFinal = Math.round(this.dependability * 10) / 10;
  //         }
  //         else {
  //           null
  //         }
  //       }
  // }



  render() {
    console.log("behaviour", behaviour)
    let averageTotal = parseInt(this.state.behaviour) + parseInt(this.state.skillLevel) + parseInt(this.state.communication) + parseInt(this.state.dependability)
    let averageRating = averageTotal / 4
    finalroundratings = Math.round(averageRating * 10) / 10;
    return (

      <ScrollView style={styles.containerstyle} refreshControl={

        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />
      }>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" animated={true} />
        <View>
          <View style={[styles.HallList, styles.margin10]}>
            <View style={styles.reviewListing}>
              <View style={styles.HallListAvatar}>
                <Image
                  style={styles.HallListAvataimage}
                  source={require("../../images/Oval.png")}
                  source={{ uri: this.props.employeeitem.item.reviewTo.profilePic !== "" ? this.props.employeeitem.item.reviewTo.profilePic : 'https://cdn.pbrd.co/images/HOYTMfd.png' }}
                />
              </View>
              <View style={[styles.HallListName, styles.removeBorderReveiw]}>
                <View style={styles.HallListRating}>
                  <Text style={styles.HallListUser}> {this.capitalize(this.state.username)}</Text>
                  {/* <Text style={styles.HallListUser}>{this.state.username.charAt(0).toUpperCase() + this.state.username.slice(1)}</Text> */}
                  {/* <Text style={styles.HallListUser}>{this.state.username}</Text> */}
                  <View style={styles.HallListStar}>
                    <StarRating
                      disabled={true}

                      fullStarColor={
                        finalroundratings >= 1 && finalroundratings <= 1.5
                          ? "red"
                          : finalroundratings >= 1.5 && finalroundratings <= 2.2
                            ? "red"
                            : finalroundratings >= 2.3 && finalroundratings <= 2.7
                              ? "#FFCD83"
                              : finalroundratings >= 2.8 && finalroundratings <= 3.2
                                ? "#FFCD83"
                                : finalroundratings >= 3.3 && finalroundratings <= 3.7
                                  ? "#FFEB4E"
                                  : finalroundratings >= 3.8 && finalroundratings <= 4.2
                                    ? "#CDEB76"
                                    : finalroundratings >= 4.3 && finalroundratings <= 4.7
                                      ? "#CDEB76"
                                      : "#2AF98A"
                      }
                      maxStars={5}
                      starSize={14}
                      emptyStar={"star"}
                      emptyStarColor={"#e9e9e9"}
                      rating={finalroundratings}
                      starColor={"red"}
                    // selectedStar={(rating) => this.onStarRatingPress(rating)}
                    />
                    <View style={{ marginLeft: 10, fontSize: 12 }}><Text>{finalroundratings}</Text></View>
                  </View>

                </View>
                {/* <View style={styles.HallListReview}>
                    <Text style={styles.HallListReviewText}>{gotlength} Reveiws</Text>
                  </View> */}
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
                    this.state.behaviour >= 1 && this.state.behaviour <= 1.5
                      ? "red"
                      : this.state.behaviour >= 1.5 && this.state.behaviour <= 2.2
                        ? "red"
                        : this.state.behaviour >= 2.3 && this.state.behaviour <= 2.7
                          ? "#FFCD83"
                          : this.state.behaviour >= 2.8 && this.state.behaviour <= 3.2
                            ? "#FFCD83"
                            : this.state.behaviour >= 3.3 && this.state.behaviour <= 3.7
                              ? "#FFEB4E"
                              : this.state.behaviour >= 3.8 && this.state.behaviour <= 4.2
                                ? "#CDEB76"
                                : this.state.behaviour >= 4.3 && this.state.behaviour <= 4.7
                                  ? "#CDEB76"
                                  : "#2AF98A"
                  }
                  maxStars={5}
                  starSize={14}
                  emptyStar={"star"}
                  emptyStarColor={"#e9e9e9"}
                  rating={this.state.behaviour}
                // selectedStar={(rating) => this.onStarRatingPress(rating)}
                />
              </View>
              <View style={styles.number}>
                <Text style={styles.numberText}>{this.state.behaviour}</Text>
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
                    this.state.skillLevel < 1 ? "red" :
                      this.state.skillLevel >= 1 && this.state.skillLevel <= 1.5
                        ? "red"
                        : this.state.skillLevel >= 1.5 && this.state.skillLevel <= 2.2
                          ? "red"
                          : this.state.skillLevel >= 2.3 && this.state.skillLevel <= 2.7
                            ? "#FFCD83"
                            : this.state.skillLevel >= 2.8 && this.state.skillLevel <= 3.2
                              ? "#FFCD83"
                              : this.state.skillLevel >= 3.3 && this.state.skillLevel <= 3.7
                                ? "#FFEB4E"
                                : this.state.skillLevel >= 3.8 && this.state.skillLevel <= 4.2
                                  ? "#CDEB76"
                                  : this.state.skillLevel >= 4.3 && this.state.skillLevel <= 4.7
                                    ? "#CDEB76"
                                    : "#2AF98A"
                  }
                  maxStars={5}
                  starSize={14}
                  emptyStar={"star"}
                  emptyStarColor={"#e9e9e9"}
                  rating={this.state.skillLevel}
                // selectedStar={(rating) => this.onStarRatingPress(rating)}
                />
              </View>
              <View style={styles.number}>
                <Text style={styles.numberText}>{this.state.skillLevel}</Text>
              </View>
            </View>

            <View style={styles.writeReviewRatingSectiontitle}>
              <View style={styles.writeReviewRatingSectionRatingTitle}>
                <Text style={styles.writeReviewRatingSectionRatingTitleWord}>
                  Communication
                  </Text>
              </View>
              <View style={styles.changestar}>
                <StarRating
                  disabled={true}
                  fullStarColor={
                    this.state.communication < 1 ? "red" :
                      this.state.communication >= 1 && this.state.communication <= 1.5
                        ? "red"
                        : this.state.communication >= 1.5 && this.state.communication <= 2.2
                          ? "red"
                          : this.state.communication >= 2.3 && this.state.communication <= 2.7
                            ? "#FFCD83"
                            : this.state.communication >= 2.8 && this.state.communication <= 3.2
                              ? "#FFCD83"
                              : this.state.communication >= 3.3 && this.state.communication <= 3.7
                                ? "#FFEB4E"
                                : this.state.communication >= 3.8 && this.state.communication <= 4.2
                                  ? "#CDEB76"
                                  : this.state.communication >= 4.3 && this.state.communication <= 4.7
                                    ? "#CDEB76"
                                    : "#2AF98A"
                  }
                  maxStars={5}
                  starSize={14}
                  emptyStar={"star"}
                  emptyStarColor={"#e9e9e9"}
                  rating={this.state.communication}
                // selectedStar={(rating) => this.onStarRatingPress(rating)}
                />
              </View>
              <View style={styles.number}>
                <Text style={styles.numberText}>{this.state.communication}</Text>
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
                    this.state.dependability >= 1 && this.state.dependability <= 1.5
                      ? "red"
                      : this.state.dependability >= 1.5 && this.state.dependability <= 2.2
                        ? "red"
                        : this.state.dependability >= 2.3 && this.state.dependability <= 2.7
                          ? "#FFCD83"
                          : this.state.dependability >= 2.8 && this.state.dependability <= 3.2
                            ? "#FFCD83"
                            : this.state.dependability >= 3.3 && this.state.dependability <= 3.7
                              ? "#FFEB4E"
                              : this.state.dependability >= 3.8 && this.state.dependability <= 4.2
                                ? "#CDEB76"
                                : this.state.dependability >= 4.3 && this.state.dependability <= 4.7
                                  ? "#CDEB76"
                                  : "#2AF98A"
                  }
                  maxStars={5}
                  starSize={14}
                  emptyStar={"star"}
                  emptyStarColor={"#e9e9e9"}
                  rating={this.state.dependability}
                // selectedStar={(rating) => this.onStarRatingPress(rating)}
                />
              </View>
              <View style={styles.number}>
                <Text style={styles.numberText}>{this.state.dependability}</Text>
              </View>
            </View>
          </View>
          <View style={styles.ReviewHead}>
            <Text style={styles.ReviewHeadText}>Review</Text>
          </View>

          <View style={styles.ReadReviewCard}>
            <View style={styles.ReadReviewCardRating}>
              <StarRating
                disabled={true}
                maxStars={5}
                starSize={14}
                emptyStar={"star"}
                emptyStarColor={"#e9e9e9"}
                fullStarColor={
                  finalroundratings < 1 ? "red" :
                    finalroundratings >= 1 && finalroundratings <= 1.5
                      ? "red"
                      : finalroundratings >= 1.5 && finalroundratings <= 2.2
                        ? "red"
                        : finalroundratings >= 2.3 && finalroundratings <= 2.7
                          ? "#FFCD83"
                          : finalroundratings >= 2.8 && finalroundratings <= 3.2
                            ? "#FFCD83"
                            : finalroundratings >= 3.3 && finalroundratings <= 3.7
                              ? "#FFEB4E"
                              : finalroundratings >= 3.8 && finalroundratings <= 4.2
                                ? "#CDEB76"
                                : finalroundratings >= 4.3 && finalroundratings <= 4.7
                                  ? "#CDEB76"
                                  : "#2AF98A"
                }
                maxStars={5}
                starSize={14}
                rating={finalroundratings}
              // selectedStar={(rating) => this.onStarRatingPress(rating)}
              />
              <View><Entypo name="dot-single" size={15} color="#e9e9e9" /></View>
              {/* <View><Text style={styles.RecentJustnow}><TimeAgo time={itemstext.createdAt} /></Text></View> */}
            </View>

            <View style={styles.ReviewCardDescription}>
              <Text>
                {this.state.message}

              </Text>
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
        </View>

        {/* //   <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 150 }}><Text style={{ textAlign: 'center' }}> You don't have any reviews for now.</Text></View> */}

      </ScrollView>
    );
  }
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderBottomColor: colors.LightGrey,
    borderColor: "#fff",
    // borderColor: '#fff',
    // borderRadius: 4,
    backgroundColor: "white",
    color: "black"
  },
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  absolute: {
    position: "absolute",
    backgroundColor: "red",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});




export default RecentDetails;