import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { deletePlace } from '../../store/actions/index'

class PlaceDetail extends Component {
    state = {
        viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
    };

    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
    }
    
    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles);
    }

    updateStyles = dims => {
        this.setState({
            viewMode: dims.window.height > 500 ? "portrait" : "landscape"
        });
    }

    placeDeleteHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key);
        this.props.navigator.pop();
    }
    render () {
        return (
            <View style={this.state.viewMode === 'portrait' ? styles.portraitContainer : styles.landscapeContainer}>
                <View style={styles.subContainer} >
                    <Image source={this.props.selectedPlace.image} style={styles.placeImage} />
                </View>
                <View style={styles.subContainer} >
                    <View>
                        <Text style={styles.placeName} >{this.props.selectedPlace.name}</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={this.placeDeleteHandler}>
                            <View style={styles.deleteButton}>
                                <Icon size={30} name={Platform.OS === "android" ? "md-trash" : "ios-trash"} color="red" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    portraitContainer: {
        margin: 22,
        flex: 1,
        flexDirection: "column"
    },
    landscapeContainer: {
        margin: 22,
        flex: 1,
        flexDirection: "row"
    },
    placeImage: {
        // margin: 22,
        height: 200,
        width: "100%"
    },
    placeName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28
    },
    deleteButton: {
        alignItems: "center"
    },
    subContainer: {
        flex: 1
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: (key) => dispatch(deletePlace(key))
    };
};

export default connect(null, mapDispatchToProps)(PlaceDetail);