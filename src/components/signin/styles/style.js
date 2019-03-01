import { StyleSheet } from 'react-native';
import {Fonts} from '../../../utlis/Fonts'
import colors from '../../Elements/colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 33,
    backgroundColor: '#fff'
  },
  containersin: {
    flex: 1,
    padding: 33,
    backgroundColor: '#fff',
    flexDirection: 'column'
  },
  welcome: {
    fontSize: 20
  },
  contanersignin: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    // backgroundColor: 'red'
    // marginTop: '30%'
    // backgroundColor: 'red'
  },
  maintext:{
    // color: 'red',
    fontSize: 30,
    color: '#000',
    fontFamily: "Roboto-Regular"
    // fontSize: 100,
  },
  maintextnew: {
    fontSize: 20,
    marginTop: 20,
    color: '#000',
    fontFamily: "Roboto-Regular"
  },
  paraText:{
    fontSize: 17,
    color: '#A2A3A5',
    fontFamily: "Roboto-Regular",
    lineHeight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    textAlign: 'center',
  },
  forminput: {
    flex:3,
    paddingTop: 50
    // backgroundColor: 'blue'
  },
  labelColor: {
     color : '#A2A3A5'
  },
  textinputmargin:{
    marginTop: 20
  },
  forgotcontent: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  forgotText: {
    color: colors.BrandColorText,
    marginTop: 22,
  },
  buttonStyle: {
    alignItems: 'center',
  },
  haveaccount:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 50
  },
  mgtop20:{
    marginTop: 40
  },
  TextAccount:{
    fontFamily: "Roboto-Regular",
    color: '#666972',
  },
  margLef10:{
    marginLeft: 8
  },
  SignUpText:{
    color: colors.BrandColorText
  },
  DisabledButton:{
    backgroundColor: colors.GreyColor,
  }
});