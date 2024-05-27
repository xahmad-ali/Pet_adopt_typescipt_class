import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp,useNavigation } from '@react-navigation/native';





class Welcome extends React.Component {
    logining = () => {
        this.props.navigation.navigate('Login');
    }

    signing = () => {
        this.props.navigation.navigate('Signup');
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'grey' }]} 
                    onPress={this.logining}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <Text style={styles.textstyle1}>Have not registered yet?</Text>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'plum' }]} 
                    onPress={this.signing}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default function (props) {
    const navigation = useNavigation();
  
    return <MyBackButton {...props} navigation={navigation} />;
  }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 150,
        height: 50,
        borderRadius: 25,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    textstyle: {
        fontSize: 40,
        marginBottom: 10,
        fontWeight: 'bold',
        color: 'plum',
        backgroundColor: 'lavender',
        width: 370,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    textstyle1: {
        fontSize: 15,
        marginTop: 10,
        marginBottom: 8,
        color: 'purple',
        textAlign: 'center',
        width: 350,
    },
    image1: {
        marginBottom: 10,
        width: 350,
        height: 380,
    }
});

export {Welcome};
