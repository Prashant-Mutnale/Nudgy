import React from "react";
import {
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  AsyncStorage,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  BackHandler
} from "react-native";
import { Actions } from "react-native-router-flux";
import styles from "../dashboard/styles/style";
import colors from "../Elements/colors";
import StarRating from "react-native-star-rating";
import KeyboardSpacer from "react-native-keyboard-spacer";
import ButtonComman from "../Elements/ButtonComman";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { employeesearch } from "../../redux/actions/Employeesearch";
import { shoutout, emptydata } from "../../redux/actions/Shoutout";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-simple-toast";
import ios from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CheckBox from "react-native-checkbox-heaven";
let leftText = "hello";
let gettoken;
let profileDataimage
const starStyle = {
  width: 35,
  margin: 8,
};
class ShoutOut extends React.Component {
  constructor(props) {
    super(props);
    this.inputRefs = {};
    this.state = {
      starCount: 0,
      favColor: undefined,
      employeetext: "",
      hidediv: false,
      selectedname: "",
      selectedid: "",
      messagetext: "",
      anonymousstate: "false",
      checked: false,
      profilepic: ''
    };
    this.searchdata = this.searchdata.bind(this);
    this.selectuser = this.selectuser.bind(this);
    this.onsumbit = this.onsumbit.bind(this);
    this.messageupdate = this.messageupdate.bind(this);
    this.errorhandle = this.errorhandle.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  async componentDidMount() {
    const signindetails = await AsyncStorage.getItem("signindata");
    let parsedata = JSON.parse(signindetails);
    gettoken = parsedata.accessToken;
    this.props.employeesearch(gettoken);
    this.props.emptydata();
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    console.log("mounteddvalue")
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    // this.props.navigation.goBack(null);
    if (Actions.currentScene == "shoutOut") {
      Actions.popTo('Recent')
      return true;
    }
    // console.log("currentscene", Actions.currentScene)
    // 
  }
  selectuser(username, iduser, profilepicture) {
    console.log("username", username);
    console.log("iduser", iduser);

    this.setState({
      hidediv: true,
      selectedname: username,
      selectedid: iduser,
      profilepic: profilepicture
    });
  }
  handleOnChange(val) {
    this.setState({ checked: val });
  }
  errorhandle() {
    this.props.emptydata();
  }
  // successhandle() {
  //     Actions.Recent()
  // }
  // componentWillReceiveProps(nextProps, prevState) {
  //     console.log("nextProps", nextProps.shoutoutresponse.shoutoutdata)
  //     console.log("thisprops", this.props.shoutoutresponse.shoutoutdata)
  //     if (nextProps.shoutoutresponse.shoutoutdata !== "") {
  //         if (nextProps.shoutoutresponse.shoutoutdata.message == "You have already reviewed this member") {
  //             Toast.show('You have already reviewed this member');
  //             // Alert.alert(
  //             //     'Shout out',
  //             //     'You have already reviewed this member',
  //             //     [
  //             //         { text: 'Ok', onPress: () => this.errorhandle() },
  //             //         // { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
  //             //         // { text: 'OK', onPress: () => console.log('OK Pressed') },
  //             //     ],
  //             //     { cancelable: false }
  //             // )
  //         }
  //         else {
  //             Actions.Recent()
  //             Toast.show('Thankyou For your Feedback');
  //         }
  //     }
  // }
  messageupdate(reviewtext) {
    this.setState({
      messagetext: reviewtext
    });
  }
  onsumbit() {
    console.log("selectedname", this.state.selectedname);
    console.log("selectedid", this.state.selectedid);
    console.log("starCount", this.state.starCount);
    console.log("userid", this.props.dataId)
    let shoutoutpost = {
      reviewMessage: this.state.messagetext,
      shoutOutRating: this.state.starCount.toString(),
      projectId: "5b3dfbc36393e54d967e590e",
      type: "shoutOut",
      reviewTo: this.props.dataId,
      anonymous: this.state.checked.toString()
    };
    // if (this.state.starCount >= 1) {
    //     alert("Please select the rating")
    // }
    // else if (this.state.messagetext !== "") {
    //     alert("Please enter the message")
    // }
    // else if (this.state.selectedid !== "") {
    //     alert("Please select the user")
    // }
    // else{

    // }
    this.props.shoutout(gettoken, shoutoutpost);
  }
  capitalize(text) {
    return text.replace(/\b\w/g, function (m) { return m.toUpperCase(); });
  }
  onClick() {
    this.setState({
      checked: !this.state.checked
    });
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }
  searchdata(employeename) {
    this.setState({
      employeetext: employeename,
      hidediv: false
    });
    this.props.employeesearch(gettoken, this.state.employeetext);
    console.log("employeename", this.state.employeetext);
  }

  render() {
    profileDataimage = this.props.dataImage
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.mainContainer}>
          <StatusBar backgroundColor="#fff" barStyle="dark-content" animated={true} />
          <View style={styles.searchView}>
            <View style={styles.feedbackHead}>
              <Text style={{
                fontSize: 14,
                textAlign: "center",
                fontFamily: "Roboto-Medium",
              }}>Use shout out to appreciate your </Text>
              <Text style={{
                fontSize: 14,
                textAlign: "center",
                fontFamily: "Roboto-Medium",
              }}>colleague in public </Text>
            </View>
            <View style={styles.searchInput}>
              <View style={styles.shoutOutSearch}>
                <FontAwesome name="search" size={20} color={"#cecece"} />
              </View>
              {/* <TextInput
                style={styles.ShoutOutTextInput}
                onChangeText={text => this.searchdata(text)}
                value={this.state.employeetext}
                placeholder={"Search Employe Name"}
                placeholderTextColor={"#A09999"}
              /> */}
              <TouchableOpacity style={styles.ShoutOutTextInput} onPress={() => Actions.shoutoutsearch()}><Text>Search Employe Name</Text></TouchableOpacity>
            </View>
            <View style={[styles.writeReviewRatingSection, styles.newflex]}>
              {this.state.hidediv == false ? (
                <View
                  style={{
                    marginLeft: 20,
                    marginRight: 20,
                    borderColor: "#e9e9e9",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    position: "absolute",
                    zIndex: 9999,
                    top: 0,
                    left: 0,
                    right: 0,
                  }}
                >
                  {this.props.Employeesearch !== "" ? (
                    <FlatList
                      data={this.props.Employeesearch.employees}
                      style={{ flexGrow: 1 }}
                      showsVerticalScrollIndicator={false}
                      renderItem={(items, i) => {
                        console.log("here is your thing", items);
                        let dataitems = items.item;
                        console.log("dataitems", dataitems)
                        return this.state.employeetext !== "" ? (
                          <KeyboardAwareScrollView>
                            <TouchableOpacity
                              key={i}
                              activeOpacity={1}
                              style={styles.backwhite}
                              onPress={() =>
                                this.selectuser(dataitems.name, dataitems.id, items.item.profilePic)
                              }
                            >
                              <View style={styles.searchavatarholder}>
                                <Image
                                  style={styles.searchavatar}
                                  // source={require("../../images/Oval.png")}
                                  source={{ uri: items.item.profilePic !== "" ? items.item.profilePic : 'https://cdn.pbrd.co/images/HOYTMfd.png' }}
                                />
                              </View>
                              <View style={styles.searchedname}>
                                <Text style={styles.HallListUser}>
                                  {/* {dataitems.name.charAt(0).toUpperCase() +
                                    dataitems.name.slice(1)} */}
                                  {/* {this.capitalize(dataitems.name)} */}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </KeyboardAwareScrollView>
                        ) : // <Text>{items.item.name}</Text>
                          null;
                      }}
                    />

                  ) : null}
                </View>
              ) : null}
              {this.props.dataname !== undefined ? (
                <View
                  style={{
                    padding: 10,
                    marginTop: 10,
                    borderColor: "#e9e9e9",
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: -1,
                  }}
                  activeOpacity={1}
                  onPress={() =>
                    this.selectuser(dataitems.name, dataitems.id)
                  }
                >
                  <View style={[styles.searchavatarholder, styles.newsearchAvatar]}>
                    <Image
                      style={styles.HallListAvataimage}
                      // source={require("../../images/Oval.png")}
                      source={{ uri: profileDataimage !== "" ? profileDataimage : 'https://cdn.pbrd.co/images/HOYTMfd.png' }}
                    />
                  </View>
                  <View style={[styles.searchedname, styles.removemargin]}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#000",
                        fontFamily: 'Roboto-Medium'
                      }}
                    >
                      {/* {
                        this.props.dataname !== undefined ? this.props.dataname.charAt(0).toUpperCase() +
                          this.props.dataname.slice(1) : null
                      } */}

                      {this.capitalize(this.props.dataname)}
                    </Text>
                  </View>
                </View>
              ) : null}
              <View
                style={{ justifyContent: "center", alignItems: "center", marginTop: 30, zIndex: -1, position: 'relative' }}
              >
                <StarRating
                  disabled={false}
                  fullStarColor={
                    this.state.starCount == 1
                      ? "red"
                      : this.state.starCount == 2
                        ? "#FFCD83"
                        : this.state.starCount == 3
                          ? "#FFEB4E"
                          : this.state.starCount == 4
                            ? "#CDEB76"
                            : "#2AF98A"
                  }
                  maxStars={5}
                  starSize={40}
                  emptyStarColor={"#D0D8E0"}
                  emptyStar={"star"}
                  emptyStarColor={"#e9e9e9"}
                  rating={this.state.starCount}
                  starStyle={starStyle}
                  selectedStar={rating => this.onStarRatingPress(rating)}
                />
              </View>
            </View>
          </View>
          <View style={styles.mainView}>
            <View style={styles.writeReviewWriteSectionText}>
              <View style={[styles.subViewInputText]}>
                <TextInput
                  style={styles.writeReviewWriteSectionTextInput}
                  onChangeText={text => this.messageupdate(text)}
                  multiline={true}
                  placeholder={"Write here…"}
                  placeholderTextColor={"#A09999"}
                  value={this.state.messagetext}
                />
              </View>
            </View>
            <TouchableOpacity
              style={{ flexDirection: "row", marginTop: 10 }}
              onPress={() => this.onClick()}>
              <View style={{
                flex: 0.1,
                paddingLeft: 15
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
            </TouchableOpacity>
          </View>
          <View style={styles.submitButton}>
            <View style={styles.submitInner}>
              <TouchableOpacity
                disabled={
                  this.props.dataname !== undefined &&
                    this.state.starCount >= 1 &&
                    this.state.messagetext !== ""
                    ? false
                    : true
                }
                style={
                  this.props.dataname !== undefined &&
                    this.state.messagetext !== "" &&
                    this.state.starCount >= 1
                    ? [ButtonComman.button]
                    : [ButtonComman.DisabledButton, styles.mgtop20]
                }
                onPress={() => this.onsumbit()}
              >
                <Text style={styles.buttonText}>SHOUT OUT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
function mapStateToProps(state) {
  console.log(state.searchdata);
  return {
    Employeesearch: state.searchdata.searchdata,
    shoutoutresponse: state.shoutoutdata
  };
}
export default connect(
  mapStateToProps,
  { employeesearch, shoutout, emptydata }
)(ShoutOut);

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderBottomColor: colors.LightGrey,
    borderColor: "#fff",
    backgroundColor: "white",
    color: "black"
  }
});
