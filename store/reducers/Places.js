import Place from "../../models/Place";
import { ADD_PLACE, FETCH_PLACES, TOGGLE_FAVORITE, FETCH_FAVORITE } from "../actions/Places";
const initialState = {
  placesList: [],
  favoritePlaces: [],
};

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAVORITE :
      const favPlaces = action.data.map( el => state.placesList.find( place => place.id === el))
      return {
        ...state,
        favoritePlaces: favPlaces
      }
    case TOGGLE_FAVORITE:
      const updateFav = action.data.map((e) => {
        return state.placesList.find((elm) => elm.id == e);
      });
      return { ...state, favoritePlaces: updateFav };
    case ADD_PLACE:
      const newPlace = new Place(
        action.Data.id.toString(),
        action.Data.title,
        action.Data.imgUrl,
        action.Data.address,
        action.Data.location.latitude,
        action.Data.location.longitude
      );
      return {
        ...state,
        placesList: state.placesList.concat(newPlace),
      };
    case FETCH_PLACES:
      return {
        ...state,
        placesList: action.places.map(
          (place) =>
            new Place(
              place._id,
              place.title,
              place.imgUrl,
              place.address,
              place.lat,
              place.lng
            )
        ),
      };
    default:
      return state;
  }
};

export default placesReducer;

