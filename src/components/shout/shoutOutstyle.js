import { StyleSheet } from 'react-native';
import { Fonts } from '../../utlis/Fonts'
import colors from '../Elements/colors'
export default StyleSheet.create({
    ShoutOutTextInput: {
        justifyContent: 'center', borderWidth: 1, borderColor: '#cecece', padding: 10, paddingLeft: 50, fontSize: 16, borderRadius: 3, height: 50
    },
    shoutOutSearch: {
        position: 'absolute', top: '32%', left: '5%'
    },
    shoutOutRatingHeading: {
        position: 'relative', backgroundColor: '#fff'
    },
    shoutoutRatingSection: {
        flex: 1, paddingBottom: 20, padding: 0, justifyContent: 'center', alignItems: 'center'
    },

    shoutOutRatingSectionTitle:
        { flexDirection: 'column', maxHeight: 100, paddingBottom: 0 },

    shoutOutRateText: {
        fontSize: 16, color: '#6A6E72', paddingTop: 10, fontFamily: "Roboto-Regular"
    },
    backwhite: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#e9e9e9',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 15,
        borderColor: "#e9e9e9",
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    searchavatarholder: {
        width: 40,
        height: 40,
        overflow: 'hidden',
        borderRadius: 50
    },
    searchavatar: {
        flexShrink: 1,
        flex: 1,
        width: null
    },
    removemargin: {
        marginLeft: 0
    },
    searchedname: {
        marginTop: 10,
        marginLeft: 10,
    },
    newsearchAvatar: {
        width: 50,
        height: 50
    },
    submitButton: {
        flex: 1,
        margin: 20,
        flexDirection: 'column',
        marginTop: 50,
        paddingBottom: 20
    },






    // newstyles
    maincontainers: {
        flexDirection: 'column',
        // backgroundColor: 'red',
        flex: 1
    },
    searchSection: {
        flex: 4,
        backgroundColor: '#fff'
    },
    inputText: {
        margin: 25
    },
    commentSection: {
        flex: 3,
        // backgroundColor: 'green'
    },
    shoutSearchicon: {
        position: 'absolute', top: '30%', left: '5%'
    },
    searchResults: {
        position: 'relative',
        // height: 200,
        position: 'absolute',
        top: 60, zIndex: 4,
        // flexGrow: 1,
        right: 0,
        left: 0,
        zIndex: 4,
        // height: 100,
        // margin: 20,
        // backgroundColor: 'red',
        flex: 1,
        height: 300
        // width: 300
    },
    searchposition: {
        // position: 'absolute',
        flex: 1,
        height: 300
    },
    makelsit: {
        height: 0
    },







    // new styles
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        paddingTop: 20
    },
    // mainView:{
    //     flex: 1,
    // },
    // searchView: {
    //     flex: 2
    // },
    searchInput: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
    },
    anonymousText: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        color: 'rgba(33,33,33,0.87)',
        marginLeft: 8
    }
})