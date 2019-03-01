import { StyleSheet } from 'react-native';
import {Fonts} from '../../../utlis/Fonts'
import colors from '../../Elements/colors'

export default StyleSheet.create({
    ContainerSplash: {
        flex: 1,
        backgroundColor: colors.blackBackground,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
  },
  LogoStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      backgroundColor: 'red',
      marginTop: 100
  },
  LogoText: {
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 50,
      color: colors.WhiteText,
      fontFamily: Fonts.RobotoRegular
  },
  LogoPara:{
      color: colors.WhiteText,
      marginTop: 5,
      fontSize: 15
  }
});