import { StyleSheet } from 'react-native';
import colors from '../Elements/colors'
import {Fonts} from '../../utlis/Fonts'

export default StyleSheet.create({
    button:{
        // backgroundColor: colors.brandbackgroundColor,
        backgroundColor: colors.blackBackground,
        padding: 20,
        alignItems: 'center',
        borderRadius: 3
    },
    buttonText: {
        color: colors.WhiteText,
        fontSize: 18,
        fontFamily: Fonts.RobotoRegular
    },
    DisabledButton: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: colors.GreyColor
    }
})