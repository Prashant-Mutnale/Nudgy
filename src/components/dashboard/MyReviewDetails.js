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
let behaviour  = 0
let communication = 0
let dependability  = 0
let skillLevel = 0
let finalroundratings = 0
let username
class myReviewDetails extends React.Component {
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

  componentDidMount(){
      console.log("gotrecentid", this.props.employeeitem)
      // this.setState({
      //   behaviour: dataitems.employeeRating.behavior,
      //   skillLevel: dataitems.employeeRating.skillLevel,
      //   communication: dataitems.employeeRating.communication,
      //   dependability: dataitems.employeeRating.dependability,
      //   username: dataitems.reviewTo.name,
      //   message: dataitems.reviewMessage
      // })
  }



  render() {
    return (

      <ScrollView style={styles.containerstyle} refreshControl={
      
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />
      }>
       
    
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




export default myReviewDetails;