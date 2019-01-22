import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

class PickLocation extends Component {
    render() {
        return (
            <View style={styles.container} >
                <View style={styles.placeHolder} >
                    <Text>Map!</Text>
                </View>
                <View style={styles.button} >
                    <Button title="Locate Me!" onPress={() => alert("Pick Location!")} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center"
    },
    placeHolder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        height: 150,
        width: "80%"
    },
    button: {
        margin: 8
    }
});

export default PickLocation;