import React from 'react';
import {
    TextInput,
    Text,
    TouchableOpacity,
    Image,
    View
} from 'react-native';
export class TabIcon extends React.Component {
    render() {
      /** some styling **/
      return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'blue'}}>
          <Text style={{color:'#fff'}}>{this.props.name}</Text>
        </View>
      );
    }
  }