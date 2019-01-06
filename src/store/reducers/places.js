import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes';

const initialState = {
    places: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE: 
            return {
                ...state,
                places: state.places.concat({
                    key: Math.random(), 
                    name: action.placeName,
                    image: {
                      uri: "https://d27k8xmh3cuzik.cloudfront.net/wp-content/uploads/2017/09/shutterstock_351622814.jpg"
                    }
                })
            };
        case DELETE_PLACE: 
            return {
                ...state,
                places: state.places.filter(place => {
                    return place.key !== action.placeKey;
                })
            };
        default: 
            return state;
    }
};

export default reducer;