import { StyleSheet } from 'react-native';
import { Fonts } from '../../../../utlis/Fonts'
import colors from '../../../Elements/colors'
let FontsRoboto = Fonts.RobotoRegular
export default StyleSheet.create({
    // Reviewfor: {
    //     marginTop: 5
    // },
    ManagementBar: {
        backgroundColor: '#fff',
        marginTop: 5,
        paddingTop: 24,
        paddingBottom: 24,
        paddingLeft: 24,
        paddingRight: 24,
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusprofileICon: {
        flex: 0.4
    },
    statusprofiledescription: {
        flex: 3
    },
    statusprofiledescriptiontext: {
        fontSize: 14,
        fontFamily: "Roboto-Regular",
    },
    selectMonthDisable: {
        flex: 1,
        justifyContent: "center",
        paddingLeft: 30,
        flexDirection: "row",
        alignItems: 'center',
    },
    selectMonthEnable: {
        flex: 1,
        justifyContent: "center",
        paddingLeft: 30,
        flexDirection: "row",
        alignItems: 'center',
        backgroundColor: '#f2f2f2'
    },
    calenderHolder: {
        backgroundColor: '#000',
        width: 54,
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        position: 'absolute',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 20,
        right: 20,
        paddingTop: 0,
        bottom: 30,
        zIndex: 2
    }
})