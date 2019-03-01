import { StyleSheet, Dimensions } from 'react-native';
import { Fonts } from '../../../../utlis/Fonts'
import colors from '../../../Elements/colors'
let robotoregular = Fonts.RobotoRegular
let fontSize = 18;
let fontSizeSmall = 14;
let fontSizeMedium = 16;


export default StyleSheet.create({
    writereviewContainerstyle: {
        height: Dimensions.get('window').height,
        backgroundColor: '#eceef1'
    },
    writeReview: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    writeReviewHeader: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        paddingBottom: 0,
        backgroundColor: '#fff'

    },
    writeReviewHeaderPart1: {
        alignItems: 'center',
        height: 100,
        width: 100,
        borderRadius: 50,
        overflow: 'hidden'

    },
    writeReviewImagesView: {

        //   width: 120,
        //   height: 120,
        //   borderRadius: 120/2,

        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
    },
    writeReviewHeaderPart2: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 20,
        height: 120,
    },
    writeReviewHeaderTitle1: {
        fontFamily: "Roboto-Regular",
        fontSize: fontSize,
        color: 'rgba(33,33,33,0.87)',
        //lineHeight: 40,

    },
    writeReviewHeaderPart2Heading: {
        marginBottom: 20
    },
    writeReviewHeaderTitle2: {
        fontFamily: "Roboto-Regular",
        fontSize: fontSizeSmall,
        color: '#656D72',
        // lineHeight: 20,
    },
    writeReviewImage: {
        flex: 1,
        flexShrink: 1,
        width: null
    },
    writeReviewRating: {
        flex: 2,
        //   minHeight:200,
        backgroundColor: '#fff'
    },
    writeReviewRatingHeading: {
        flex: 1,
        padding: 20,
        paddingBottom: 0,
    },
    writeReviewWriteHeading: {
        flex: 0.4,
        paddingHorizontal: 20,
        paddingTop: 25,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e9e9e9',
        backgroundColor: '#eceef1'

    },
    writeReviewRatingRateHeadingRate: {
        fontFamily: "Roboto-Regular",
        fontSize: fontSizeMedium,
        color: '#6A6E72',
        letterSpacing: 0,
        lineHeight: 20,
    },
    writeReviewRatingSection: {
        // flex: 2.5,
        flexDirection: 'column',
        backgroundColor: '#fff',
        // borderBottomWidth: 1,
        // borderBottomColor: '#E6E8EC',
        paddingHorizontal: 20,
        // paddingTop: 10,
        paddingBottom: 20,
        minHeight: 180
    },
    writeReviewRatingSectiontitle:
    {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 5

    },
    changestar: {
        flex: 0.7
    },
    writeReviewRatingSectionRatingTitle: {
        flex: 2
    },
    writeReviewRatingSectionRating: {
        flex: 2
    },
    writeReviewWriteSection: {
        flex: 1,

    },
    writeReviewWriteSectionTitle: {
        flex: 1
    },
    writeReviewWriteSectionText: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        zIndex: -1

    },
    writeReviewButtonSection: {
        flex: 0.6,
        padding: 20,
    },
    writeReviewWriteSectionTextInput: {
        fontSize: fontSize,
        fontFamily: "Roboto-Regular",
        minHeight: 100,
        // backgroundColor: 'red',
        paddingTop: 20
    },
    button: {
        backgroundColor: '#1A7EF3',
        borderRadius: 3
    },
    buttonText: {
        fontFamily: "Roboto-Regular",
        fontSize: fontSizeSmall,
        color: '#FFFFFF',
        letterSpacing: 0,

    },
    subViewInputText: {
        borderBottomWidth: 1,
        borderBottomColor: '#e9e9e9',

    },
    number: {
        flex: 0.3,
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    numberText: {
        fontFamily: "Roboto-Regular",
        fontWeight: 'bold',
        color: '#5e5e5e',
        lineHeight: 18,
        marginTop: -1,
        marginLeft: 3
    },
    writeReviewHeaderPart2Title1: {

    },
    writeReviewRatingHeadingRate: {
        fontFamily: "Roboto-Regular",
        fontSize: fontSize,
        color: '#6A6E72',
        letterSpacing: 0,
        lineHeight: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e9e9e9',
    },
    writeReviewRatingSectionRatingTitleWord: {
        fontSize: fontSizeMedium,
        color: '#3e3e3e',
        fontWeight: 'bold'
    },
    WriteReview: {
        flexDirection: 'row',
        padding: 15,
        paddingBottom: 15,
        backgroundColor: colors.WhiteBackground
    },
    writeReviewicon: {
        flex: 1,
        flexDirection: 'row',
    },
    WriteReviewCircle: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#8071ff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    WriteReviewAlign: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    ReviewText: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        fontFamily: Fonts.RobotoRegular
    },
    SelectMonth: {
        flex: 1,
    },
    reviewListing: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        paddingBottom: 10,
        paddingRight: 10,
        marginRight: 10,
        borderBottomWidth: 1,
        borderColor: '#E6EEF7',
    },
    removeBorderReveiw: {
        borderColor: '#fff'
    },
    ReviewHeadText: {
        fontSize: fontSizeSmall,
        color: '#6A6E72',
        fontFamily: "Roboto-Regular",
    },
    ReviewHead: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 20
    },
    ReadReviewCard: {
        backgroundColor: '#fff',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 24,
        paddingTop: 24,
        marginBottom: 2
    },
    ReadReviewCardRating: {
        flexDirection: 'row',
    },
    ReviewCardStatus: {
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 1
    },
    ReviewCardDescription: {
        marginTop: 8,
        position: 'relative',
        flexDirection: 'row',
    },
    revietext: {
        flexDirection: 'column',
    },
    textstatus: {
        marginLeft: 10
    },
    ReviewOverlay: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        opacity: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    margin10: {
        // marginTop: 5,
        backgroundColor: colors.WhiteBackground
    },
    // newflex: {
    //     flexDirection: 'row',
    //     position: 'relative',
    //     // minHeight: 200
    // }
    // review ends
})
