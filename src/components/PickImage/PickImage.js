import React, { Component } from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';
import BeautyImage from "../../assets/beauty.jpg";

class PickImage extends Component {
    render() {
        return (
            <View style={styles.container} >
                <View style={styles.placeHolder} >
                    <Image source={BeautyImage} style={styles.previewImage} />
                </View>
                <View style={styles.button} >
                    <Button title="Pick Image" onPress={() => alert("Pick Image!")} />
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
    },
    previewImage: {
        width: "100%",
        height: "100%"
    }
});

export default PickImage;