import React, { Component } from 'react';
import {View, TextInput, StyleSheet, Button} from 'react-native';

export default class PlaceInput extends Component {
    state = {
        placeName: ""
    };
    
    placeNameChangedHandler = val => {
        this.setState({
          placeName: val
        });
    };
    
    placeAddedHandler = () => {
        if(this.state.placeName.trim() === "") {
            return;
        }
        this.props.onPlaceAdded(this.state.placeName);
    }
    

    render(){
        return(
            <View style={styles.inputContainer}>
                <TextInput 
                style={styles.placeInput} 
                placeholder="An Awesome Place"
                value={this.placeName} 
                onChangeText={this.placeNameChangedHandler} />
                <Button title="Add" style={styles.placeButton} onPress={this.placeAddedHandler}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        // flex: 1,
        width: "100%",
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    placeInput: {
        width: "70%"
    },
    placeButton: {
        width: "30%"
    }
});