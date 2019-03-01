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
	KeyboardAvoidingView
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
const starStyle = {
	width: 35,
	margin: 8,
};
class ShoutOutSearch extends React.Component {
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
	}
	async componentDidMount() {
		const signindetails = await AsyncStorage.getItem("signindata");
		let parsedata = JSON.parse(signindetails);
		gettoken = parsedata.accessToken;
		this.props.employeesearch(gettoken);
		this.props.emptydata();
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
	messageupdate(reviewtext) {
		this.setState({
			messagetext: reviewtext
		});
	}
	onsumbit() {
		console.log("selectedname", this.state.selectedname);
		console.log("selectedid", this.state.selectedid);
		console.log("starCount", this.state.starCount);
		let shoutoutpost = {
			reviewMessage: this.state.messagetext,
			shoutOutRating: this.state.starCount.toString(),
			projectId: "5b3dfbc36393e54d967e590e",
			type: "shoutOut",
			reviewTo: this.state.selectedid,
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

	capitalize(text) {
		return text.replace(/\b\w/g, function (m) { return m.toUpperCase(); });
	}
	render() {
		console.log("needdata", this.props.Employeesearch);
		console.log("newchange", this.state.checked);
		return (
			<View style={styles.mainContainer}>
				<View style={styles.mainContainer}>
					<StatusBar backgroundColor="#fff" barStyle="dark-content" animated={true} />
					<View style={styles.searchView}>
						<View style={styles.feedbackHead}>
							<Text style={{
								fontSize: 14,
								textAlign: "center",
								fontFamily: "Roboto-Medium",
							}}>Search Employee</Text>
						</View>
						<View style={styles.searchInput}>
							<View style={styles.shoutOutSearch}>
								<FontAwesome name="search" size={20} color={"#cecece"} />
							</View>
							<TextInput
								style={styles.ShoutOutTextInput}
								onChangeText={text => this.searchdata(text)}
								value={this.state.employeetext}
								placeholder={"Search Employe Name"}
								placeholderTextColor={"#A09999"}
								autoFocus={true}
							/>
						</View>
						<View>
							{this.state.hidediv == false ? (
								<View style={{
									marginLeft: 20,
									marginRight: 20,
									borderColor: "#e9e9e9",
									// borderLeftWidth: 1,
									// borderRightWidth: 1,
								}}>
									{this.props.Employeesearch !== "" ? (
										<FlatList
											contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingBottom: 100, }}
											data={this.props.Employeesearch.employees}
											showsVerticalScrollIndicator={false}
											renderItem={(items, i) => {

												let dataitems = items.item;
												console.log("dataitems", dataitems)
												return this.state.employeetext !== "" ? (
													<TouchableOpacity
														key={i}
														activeOpacity={1}
														style={styles.backwhite}
														onPress={() =>
															Actions.shoutOut({ dataname: dataitems.name, dataId: dataitems.id, dataImage: dataitems.profilePic })
														}>
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
																{this.capitalize(dataitems.name)}

															</Text>
														</View>
													</TouchableOpacity>
												) : // <Text>{items.item.name}</Text>
													null;
											}}
											keyExtractor={(item, index) => index.toString()}
										/>

									) : null}
								</View>
							) : null}
						</View>
					</View>
				</View>
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
)(ShoutOutSearch);

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
