import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Animated } from 'react-native';
import { connect } from 'react-redux';
import PlaceList from '../../components/PlaceList/PlaceList';

class FindPlaceScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: "orange"
    };

    state = {
        placesLoaded: false,
        removeAnim: new Animated.Value(1),
        showAnim: new Animated.Value(0)
    };
    
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    placesLoadedHandler = () => {
        Animated.timing(this.state.showAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    placesSearchHandler = () => {
        Animated.timing(this.state.removeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            this.setState({
                placesLoaded: true
            });
            this.placesLoadedHandler();
        });
    }

    onNavigatorEvent = event => {
        if(event.type === "NavBarButtonPress") {
            if(event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            }
        }
    }
    
    itemSelectedHandler = key => {
        const selPlace = this.props.places.find(place => {
            return key === place.key;
        });
        this.props.navigator.push({
            screen: "awesome-places.PlaceDetailScreen",
            title: selPlace.name,
            passProps: {
                selectedPlace: selPlace
            }
        });
    }

    render () {
        let content = (
            <Animated.View 
                style={{
                    opacity: this.state.removeAnim,
                    transform: [
                        {
                            scale: this.state.removeAnim.interpolate({
                                inputRange: [0,1],
                                outputRange:[12,1]
                            })
                        }
                    ]
                }} >
                <TouchableOpacity onPress={this.placesSearchHandler}>
                    <View style={styles.searchButton}>
                        <Text style={styles.searchButtonText}>Find Places</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
        if(this.state.placesLoaded) {
            content = (
                <Animated.View style={{
                    opacity: this.state.showAnim,
                    transform: [{
                        scale: this.state.showAnim.interpolate({
                            inputRange:[0,1],
                            outputRange: [12,1]
                        })
                    }]
                }}>
                    <PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler} />
                </Animated.View>
            );
        }
        return (
            <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchButton: {
        borderColor: "orange", 
        borderWidth: 3, 
        borderRadius: 50,
        padding: 20
    },
    searchButtonText: {
        color: "orange",
        fontWeight: "bold",
        fontSize: 26
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

const mapStateToProps = state => {
    return {
        places: state.places.places
    };
};

export default connect(mapStateToProps)(FindPlaceScreen);