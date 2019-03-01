import React from 'react';
import {
    TextInput,
    Text,
    TouchableOpacity,
    Image,
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    StatusBar,
    AsyncStorage,
    Alert
} from 'react-native';
const { width } = Dimensions.get('window');
class Networksign extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            myKey: {}
        };
    }
    render() {
        return (
            <View style={styles.offlineContainer}>
                <Text style={styles.offlineText}>No Internet Connection</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    // offlineContainer: {
    //     backgroundColor: '#30A9A7',
    //     height: 30,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     flexDirection: 'row',
    //     width,
    //     position: 'absolute',
    //     top: 30
    // },
    offlineContainer: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    offlineText: { color: '#fff' }
});



export default Networksign
