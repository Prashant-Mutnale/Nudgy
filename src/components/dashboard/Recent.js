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
import Toast from 'react-native-simple-toast';
import styles from "./styles/style";
import { connect } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import StarRating from "react-native-star-rating";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { recent } from "../../redux/actions/Recent";
import { getProjectid } from '../../redux/actions/projectId'
import { reviewstatus } from '../../redux/actions/Reviewstatus'
import ActionButton from 'react-native-action-button';
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
let firstDate = 27
let lastDate = 1
let getid
let previousDateNumber
class Recent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 4,
      starNew: 3,
      starLow: 5,
      loading: true,
      refreshing: false,
      appState: AppState.currentState
    };
    this.onRefresh = this.onRefresh.bind(this);
    this.handleAppStatehange = this.handleAppStatehange.bind(this)
    this.checkEmployee = this.checkEmployee.bind(this)
    this.logout = this.logout.bind(this)
  }
  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backPressed);
  }
  componentDidMount() {
    console.log("celdlld")
    AppState.addEventListener('change', this.handleAppStatehange);

  }
  logout() {
    AsyncStorage.clear();
    Actions.SignIn()
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStatehange);
    BackHandler.removeEventListener("hardwareBackPress", this.backPressed);
  }
  handleAppStatehange(appState) {
  }
  backPressed = () => {
    if (Actions.currentScene == "Recent") {
      BackHandler.exitApp();
      Actions.header({ type: "reset" });
      return true;
    } else {
    }
  };

  emptycontentlist = () => {
    return (
      <View style={{ marginTop: "50%" }}>
        <Text style={{ textAlign: "center" }}>
          You don't have any reviews for now.
        </Text>
      </View>
    );
  };
  async componentDidMount() {
    let getDate = new Date()
    let previousDate = getDate.toString().split(" ")
    previousDateNumber = previousDate[2]
    const signindetails = await AsyncStorage.getItem("signindata");
    let parsedata = JSON.parse(signindetails);
    gettoken = parsedata.accessToken;
    this.props.recent(gettoken);
    this.props.getProjectid(gettoken)
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
        return itemsid.id
      }).join("&")
      : null
    joinId = Arrayid
    console.log("joinId", joinId)
    if (previousDateNumber >= 26 || previousDateNumber <= 3) {
      this.props.reviewstatus(gettoken, joinId, "fromdashboard")
    }
    else {
      Toast.show('You cannot review for this month');
    }

  }

  onRefresh() {
    this.setState({ refreshing: true }),
      this.props.recent(gettoken),
      this.setState({ refreshing: false });
  }
  callreview(getid) {
    console.log("getid", getid)
    Actions.hofallreview({ getid: getid, getUpdatedMonth: 'all' })
  }
  capitalize(text) {
    return text.replace(/\b\w/g, function (m) { return m.toUpperCase(); });
  }
  render() {
    // console.count();
    if (this.props.recentdata !== "" && this.props.recentdata !== undefined) {
      filtered = this.props.recentdata.filter(function (d) {
        return d.status === "approved";
      });
      datafilter = filtered;
    }
    if (!datafilter) {
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
        <StatusBar backgroundColor="#000" barStyle="light-content" />
        <View style={{ position: 'relative', flex: 1, marginTop: 10 }}>
          <FlatList
            data={datafilter}
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
                      ?
                      this.callreview(items.item.reviewTo.id)
                      // Actions.hofallreview({ getid: getid, getUpdatedMonth: 'all' })
                      : null;
                  }}
                  style={items.item.type == "review" ? styles.RecentCardsHolder : styles.RecentCardsshadow}
                >
                  <View style={styles.RecentAvatarName}>
                    <View style={styles.RecentAvatar}>
                      <Image
                        style={styles.RecentListAvataimage}
                        source={{ uri: items.item.reviewTo.profilePic !== "" ? items.item.reviewTo.profilePic : 'https://cdn.pbrd.co/images/HOYTMfd.png' }}
                      // source={require("../../images/Oval.png")}
                      />
                    </View>
                    <View style={styles.RecentNames}>
                      <Text style={styles.RecentNameText}>
                        {console.log("markit", items.item.reviewTo.name.slice(1))}
                        {/* {items.item.reviewTo.name.charAt(0).toUpperCase() +
                          items.item.reviewTo.name.slice(1)} */}
                        {/* {items.item.reviewTo.toUpperCase()} */}
                        {/* {items.item.reviewTo.name} */}
                        {this.capitalize(items.item.reviewTo.name)}
                        {/* {items.item.reviewTo.name.slice(0, 1).toUpperCase() + items.item.reviewTo.name.slice(1, items.item.reviewTo.name.length)} */}
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
                            color="#000"
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
                    flexDirection: 'row',
                    marginTop: 10,
                  }}>
                    {
                      items.item.anonymous == "true" || items.item.anonymous == "notAppilied" ? null : <View>
                        <MaterialCommunityIcons name='bullhorn' size={25} color="#4a4a4a" />
                      </View>
                    }

                    <Text style={{
                      color: '#b1acac',
                      marginTop: 2
                    }}>

                      {
                        items.item.anonymous == "true" || items.item.anonymous == "notAppilied" ? null : <Text>by </Text>
                      }
                      {/* {items.item.anonymous == "false" ? items.item.reviewBy.name.charAt(0).toUpperCase() + items.item.reviewBy.name.slice(1) : null} */}
                      {items.item.anonymous == "false" ? this.capitalize(items.item.reviewBy.name) : null}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.refreshing}
            ListEmptyComponent={this.emptycontentlist}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        {/* Rest of the app comes ABOVE the action button component !*/}
        <ActionButton buttonColor="#000" >
          <ActionButton.Item buttonColor='#fff' title="Logout" onPress={() => this.logout()}>
            <SimpleLineIcons name="logout" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#fff' title="Write to HR" onPress={() => Actions.sharefeedback()}>
            <MaterialCommunityIcons name="message-text" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#fff' title="Give a shoutout" onPress={() => Actions.shoutOut()}>
            <MaterialCommunityIcons name='bullhorn' style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#fff' title="Rate your teammate" onPress={() => this.checkEmployee({ fromDashBoard: 'fromDashBoard' })}>
            <Ionicons name="ios-star" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    recentdata: state.recentdata.recentdata.data,
    projectiddata: state.projectiddata.projectiddata.employeeProject
  };
}

export default connect(
  mapStateToProps,
  { recent, getProjectid, reviewstatus }
)(Recent);
