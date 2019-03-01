import { StyleSheet } from "react-native";
import { Fonts } from "../../../../utlis/Fonts";
import colors from "../../../Elements/colors";
export default StyleSheet.create({
  containerstyle: {
    flex: 1,
    backgroundColor: colors.LightGrey,
    position: "relative"
  },
  containerstylenew: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative"
  },
  monthPicker: {
    backgroundColor: colors.WhiteBackground,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    //   borderColor: 'red',
    marginBottom: 0,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: { width: 3, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 1,
    position: "absolute",
    top: -10,
    left: 0,
    margin: 10,
    right: 0,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    height: 60,
    flexDirection: 'row',
  },
  selectpicker: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    // borderWidth: 1,
    // borderColor: 'red',
    borderRadius: 4,
    backgroundColor: "white",
    color: "black"
  },
  HallList: {
    flex: 1,
    // backgroundColor: colors.WhiteBackground,
    position: "relative"
    // paddingTop: 10,
    // backgroundColor: '#eceef1'
  },
  HallListmain: {
    flex: 1,
    backgroundColor: "#eceef1",
    marginTop: 31
  },
  HallListCard: {
    //   padding: 10,
    // paddingBottom: 10,
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingRight: 10,
    // marginLeft: 5,
    flexDirection: "row"
    //   paddingLeft: 10,
    //   marginBottom: 10,
    //   paddingRight: 10
  },
  HallListAvatar: {
    width: 50,
    height: 50,
    marginTop: 15,
    borderRadius: 50,
    overflow: "hidden"
  },
  HallListAvataimage: {
    flexShrink: 1,
    flex: 1,
    width: null
  },
  HallListName: {
    flex: 3,
    justifyContent: "center",
    marginLeft: 11,
    flexDirection: "row",
    borderColor: "#E6EEF7",
    borderBottomWidth: 1,
    paddingBottom: 16,
    paddingTop: 16
  },
  HallListRating: {
    flex: 4,
    justifyContent: "center"
    // backgroundColor: colors.WhiteBackground,
    // paddingTop: 5,
  },
  HallListUser: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Roboto-Regular",
    // textTransform: 'capitalize'
  },
  HallListReview: {
    flex: 2,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  HallListReviewText: {
    fontFamily: "Roboto-Regular",
    fontSize: 12
  },
  HallListStar: {
    marginTop: 5,
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
  },
  HallListStarstatus: {
    flexDirection: "row",
    flex: 2,
    alignItems: "center",
    // marginTop: 3,
    // backgroundColor: 'red'
  },
  RecentContainer: {
    flex: 1,
    marginTop: 10
  },
  RecentContainernew: {
    flex: 1,
    marginTop: 0
  },
  RecentCardsHolder: {
    backgroundColor: "#fff",
    flexDirection: "column",
    padding: 15,
    marginBottom: 5,
    marginRight: 10,
    marginLeft: 10,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5

    // shadowColor: 'rgba(0, 0, 0, 0.3)',
    // shadowOffset: { width: 5, height: 1 },
    // shadowOpacity: 0.3,
    // shadowRadius: 10,
    // elevation: 2,
  },
  RecentCardsshadow: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    flexDirection: "column",
    padding: 15,
    marginBottom: 5,
    marginRight: 10,
    marginLeft: 10,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5

    // shadowColor: 'rgba(0, 0, 0, 0.3)',
    // shadowOffset: { width: 5, height: 1 },
    // shadowOpacity: 0.3,
    // shadowRadius: 10,
    // elevation: 2,
  },
  RecentAvatarName: {
    flexDirection: "row"
  },
  mainpadding: {
    padding: 20
  },
  RecentAvatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    overflow: "hidden"
  },
  RecentListAvataimage: {
    flexShrink: 1,
    flex: 1,
    width: null
  },
  RecentNames: {
    flex: 2,
    justifyContent: "center",
    marginLeft: 10
  },
  RecentNameText: {
    fontSize: 17,
    justifyContent: "center",
    fontFamily: "Roboto-Regular",
    color: "#000",
  },
  RecentStartRatings: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center"
  },
  RecentShoultout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  RecentDescription: {
    fontSize: 13,
    fontFamily: "Roboto-Regular",
    marginTop: 16,
    color: "#6B6B6B",
    justifyContent: "flex-start",
    lineHeight: 20
  },
  RecentJustNowholder: {
    justifyContent: "center",
    alignItems: "center",
    // marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 5
    // backgroundColor: 'red'
  },
  RecentJustnow: {
    fontSize: 11,
    // backgroundColor: 'red',
    color: "#9B9B9B",
    justifyContent: "center"
  },
  shoutOuticon: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 50,
    paddingTop: 2
  },
  selecteddiv: {
    position: "absolute",
    top: 100,
    left: 0,
    right: 0
  },
  backgroundnone: {
    backgroundColor: "red"
  },
  activityindicator: {
    marginTop: "50%"
  },
  newTab: {
    flexDirection: "row",
    padding: 10,
    paddingTop: 10,
    flex: 1,
    margin: 3,
    backgroundColor: "#fff",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  rateText: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    color: "#272929",
    marginRight: 5
  },
  fixedHeader: {
    flexDirection: "row",
    marginBottom: 10,
    position: "absolute",
    top: -10,
    left: 0,
    right: 0,
    marginLeft: 9,
    marginRight: 9,
    paddingTop: 10
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalInnerContent: {
    height: 200,
    // backgroundColor: "#fff",
    flexDirection: "column",
  },
  myReviewText: {
    paddingRight: 10,
    fontSize: 14,
    marginRight: 10,
    color: "#000",
    fontFamily: "Roboto-Medium"
  },
  anonymousRating: {
    fontFamily: "Roboto-Medium",
    fontSize: 16
  },
  anonymousRatingHolder: {
    marginTop: 20,
    marginLeft: 20
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "#000"
  }
  //   disableBackground:{
  //       backgroundColor: '',
  //       flexDirection: 'column',
  //       padding: 15,
  //       marginBottom: 5,
  //       marginRight: 10,
  //       marginLeft: 10,
  //       borderTopRightRadius: 5,
  //       borderTopLeftRadius: 5,
  //       borderBottomLeftRadius: 5,
  //       borderBottomRightRadius: 5,
  //   }
});
