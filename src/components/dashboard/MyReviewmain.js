import React from "react";
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  ScrollView,
  findNodeHandle,
  StatusBar,
  AsyncStorage,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import styles from "./styles/style";
import Toast from 'react-native-simple-toast';
import MyReviews from "../dashboard/MyReviews";
import ReviewByme from "../dashboard/reviewByme";
import { myreviews } from "../../redux/actions/MyReviews";
import { getProjectid } from "../../redux/actions/projectId";
import { reviewByme } from "../../redux/actions/MyReviews";
import { reviewstatus } from "../../redux/actions/Reviewstatus";
import { hrRating } from "../../redux/actions/MyReviews";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
let gettoken;
let getid;
let gotlength;
let Arrayid;
let joinId;
let last = "last"
let present = "present"
let all = "all"
let previousDateNumber

class MyReviewsmain extends React.Component {
  constructor(props) {
    super(props);
    this.getemployerating = "";
    this.behavior = 0;
    this.skillLevel = 0;
    this.communication = 0;
    this.dependability = 0;
    this.behaviorFinal = 0;
    this.skillFinal = 0;
    this.communicationFinal = 0;
    this.dependablityFinal = 0;
    this.average = 0;
    this.hrrating = 0;
    this.state = {
      viewRef: null,
      starCount: 3,
      favColor: undefined,
      lastupdated: "present",
      refreshing: false,
      changetabs: "myReviews",
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
          label: "Overall",
          value: "all"
        }
      ]
    };
    this.selectpicker = this.selectpicker.bind(this);
    this.checkTabs = this.checkTabs.bind(this);
    this.writeReviewfrommyReview = this.writeReviewfrommyReview.bind(this)
  }

  _onRefresh = () => {
    this.setState({ refreshing: true }),
      this.props.myreviews(gettoken, getid, this.state.lastupdated),
      this.setState({ refreshing: false });
  };

  selectpicker(value, index) {
    this.setState({
      lastupdated: value
    });
    this.props.myreviews(gettoken, getid, value);
    this.props.hrRating(gettoken, getid, value);
    this.props.reviewByme(gettoken, value);
  }

  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }

  checkTabs(checktabs) {
    console.log("clicked", checktabs);
    this.setState({
      changetabs: checktabs
    });
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
    this.props.myreviews(gettoken, getid, present);
    this.props.hrRating(gettoken, getid, present);
    this.props.reviewByme(gettoken, present);
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
    this.props.myreviews(gettoken, getid, last);
    this.props.hrRating(gettoken, getid, last);
    this.props.reviewByme(gettoken, last);
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
    this.props.myreviews(gettoken, getid, all);
    this.props.hrRating(gettoken, getid, all);
    this.props.reviewByme(gettoken, all);
  }

  closemodal() {
    this.setState({
      modalVisable: false
    })
  }
  async componentDidMount() {
    let getDate = new Date()
    let previousDate = getDate.toString().split(" ")
    previousDateNumber = previousDate[2]
    const signindetails = await AsyncStorage.getItem("signindata");
    let parsedata = JSON.parse(signindetails);
    gettoken = parsedata.accessToken;
    getid = parsedata.userData.id;
    loginname =
      parsedata.userData.name.charAt(0).toUpperCase() +
      parsedata.userData.name.slice(1);
    this.props.myreviews(gettoken, getid, this.state.lastupdated);
    this.props.getProjectid(gettoken);
    this.props.hrRating(gettoken, getid, this.state.lastupdated);
    this.props.reviewByme(gettoken, this.state.lastupdated);
  }

  componentWillReceiveProps(nextProps) {
    this.behavior = 0;
    this.skillLevel = 0;
    this.communication = 0;
    this.dependability = 0;
    this.behaviorFinal = 0;
    this.skillFinal = 0;
    this.communicationFinal = 0;
    this.dependablityFinal = 0;
    this.average = 0;

    if (nextProps.myreviewdata !== undefined && nextProps.myreviewdata !== "") {
      console.log("dsad", nextProps.myreviewdata.data);
      let getlength = nextProps.myreviewdata.data;
      gotlength = getlength.length;
      nextProps.myreviewdata.data !== "" &&
        nextProps.myreviewdata.data !== undefined
        ? nextProps.myreviewdata.data.map((items, i) => {
          if (gotlength >= 1 && items.employeeRating !== null) {
            username = items.reviewTo.name;
            // this.behavior = 0
            // this.skillLevel = 0
            // this.communication = 0
            // this.dependability = 0
            this.behavior =
              this.behavior + parseInt(items.employeeRating.behavior);
            console.log("behavournew", this.behavior);
            this.skillLevel =
              this.skillLevel + parseInt(items.employeeRating.skillLevel);
            this.communication =
              this.communication +
              parseInt(items.employeeRating.communication);
            this.dependability =
              this.dependability +
              parseInt(items.employeeRating.dependability);
          } else {
            null;
          }
        })
        : null;
      if (gotlength >= 1) {
        this.behavior = this.behavior / nextProps.myreviewdata.data.length;
        this.skillLevel = this.skillLevel / nextProps.myreviewdata.data.length;
        this.communication =
          this.communication / nextProps.myreviewdata.data.length;
        this.dependability =
          this.dependability / nextProps.myreviewdata.data.length;
        this.average =
          Math.round(
            ((this.behavior +
              this.skillLevel +
              this.communication +
              this.dependability) /
              4) *
            10
          ) / 10;
        this.behaviorFinal = Math.round(this.behavior * 10) / 10;
        this.skillFinal = Math.round(this.skillLevel * 10) / 10;
        this.communicationFinal = Math.round(this.communication * 10) / 10;
        this.dependabilityFinal = Math.round(this.dependability * 10) / 10;
      } else {
        null;
      }
    }
  }
  componentWillUnmount() {
    console.log("cloesit")
    this.setState({
      modalVisable: false
    })
  }
  visableModal() {
    this.setState({
      modalVisable: true
    });
  }
  writeReviewfrommyReview() {
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

  render() {
    reviewedstatus = this.props.myreviewdata.reviewed;
    if (this.props.hrData) {
      hrratingsec =
        (this.props.hrData.workCulture +
          this.props.hrData.punctuality +
          this.props.hrData.absenteeism) /
        3;
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
    this.getemployerating = this.props.myreviewdata.data;
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <StatusBar backgroundColor="#000" barStyle="light-content" />
        <View style={{ backgroundColor: "#000", height: 35 }} />
        <View style={styles.fixedHeader}>
          <TouchableOpacity
            style={styles.newTab}
            activeOpacity={1}
            onPress={() => this.checkTabs("myReviews")}
          >
            <View>
              <Text style={styles.myReviewText}>My Reviews</Text>
              {/* <Text style={styles.rateText}>teammate</Text> */}
            </View>
            <View>
              <Image source={require("../../assets/images/My-reviews.png")} />
            </View>
            {this.state.changetabs == "myReviews" ? (
              <View
                style={{
                  flexDirection: "column",
                  flex: 1,
                  width: "100%",
                  position: "absolute",
                  bottom: 0
                }}
              >
                <View
                  style={{
                    height: 3,
                    flex: 1,
                    flexDirection: "column",
                    backgroundColor: "#000"
                  }}
                />
              </View>
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.newTab}
            onPress={() => this.checkTabs("rated")}
            activeOpacity={1}
          >
            <View>
              <Text style={styles.myReviewText}>Rated by me</Text>
              {/* <Text style={styles.rateText}>shout-out</Text> */}
            </View>
            <View>
              <Image source={require("../../assets/images/rated-by-me.png")} />
            </View>
            {this.state.changetabs == "myReviews" ? null : (
              <View
                style={{
                  flexDirection: "column",
                  flex: 1,
                  width: "100%",
                  position: "absolute",
                  bottom: 0
                }}
              >
                <View
                  style={{
                    height: 3,
                    flex: 1,
                    flexDirection: "column",
                    backgroundColor: "#000"
                  }}
                />
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, marginTop: 30 }}>
          <TouchableOpacity onPress={() => this.writeReviewfrommyReview()} style={{ borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', padding: 10, marginLeft: 5, marginRight: 5 }}>
            <Text style={{ color: '#fff', fontFamily: "Roboto-Medium" }}>Write Review</Text>
          </TouchableOpacity>
          <ScrollView
            style={styles.containerstyle}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
            {this.state.changetabs == "myReviews" ? (
              <MyReviews getDate={this.props.myreviewdata} />
            ) : (
                <ReviewByme myReviewdatanew={this.props.myReviewdata} />
              )}
            {/* <MyReviews/> */}
            {/* <ReviewByme/> */}
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.calenderHolder} onPress={() => this.visableModal()}>
          <MaterialCommunityIcons
            style={{
              position: "absolute"
            }}
            name="calendar-range"
            size={22}
            color="#fff"
          />
          {/* <RNPickerSelect
            placeholder={{
              label: "Select Date",
              value: "present"
            }}
            hideIcon={true}
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
          // ref={(el) => {
          //     this.inputRefs.picker = el;
          // }}
          /> */}
        </TouchableOpacity>
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
    borderBottomColor: "#fff"
  },
  underline: {
    borderBottomWidth: 0,
    borderBottomColor: "#fff",
    borderTopWidth: 0
  },
  absolute: {
    position: "absolute",
    backgroundColor: "red",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  placeholderColor: "transparent"
};

function mapStateToProps(state) {
  return {
    myreviewdata: state.myreviewdata.myreviewdata,
    hrData: state.myreviewdata.hrdata.reviewList,
    projectiddata: state.projectiddata.projectiddata.employeeProject,
    myReviewdata: state.myreviewdata.reviebymedata.reviewList
  };
}

export default connect(
  mapStateToProps,
  { myreviews, getProjectid, reviewstatus, hrRating, reviewByme }
)(MyReviewsmain);
