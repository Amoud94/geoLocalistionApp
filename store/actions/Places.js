import * as FileSystem from "expo-file-system";
import { insertPlace, fetchAllPlaces, clearTable } from "../../helpers/db";
import shorthash from "shorthash";
import Config from "../../Config";

export const ADD_PLACE = "ADD_PLACE";
export const FETCH_PLACES = "FETCH_PLACES";
export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const FETCH_FAVORITE = "FETCH_FAVORITE";

export const toggleFavorite = (userId, placeId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${Config.localhost}/api/user/${userId}/place/${placeId}`,
        {
          method: "PUT",
        }
      );
      const resData = await response.json();
      if (resData.data.FavoritePlaces) {
        dispatch({ type: TOGGLE_FAVORITE, data: resData.data.FavoritePlaces });
      } else {
        dispatch({ type: TOGGLE_FAVORITE, data: [] });
      }
    } catch (error) {
      throw error;
    }
  };
};

export const addPlace = (title, imgPath, address, location) => {
  return async (dispatch) => {
    const name = shorthash.unique(imgPath);
    const newPath = FileSystem.cacheDirectory + name;
    try {
      await FileSystem.moveAsync({
        from: imgPath,
        to: newPath,
      });
      const result = await insertPlace(
        title,
        newPath,
        address,
        location.latitude,
        location.longitude
      );

      const response = await fetch(`${Config.localhost}/api/place`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          imgUrl: newPath,
          address: address,
          lat: location.latitude,
          lng: location.longitude,
        }),
      });
      const resData = await response.json();
      dispatch({
        type: ADD_PLACE,
        Data: {
          id: resData.data._id,
          title: title,
          imgUrl: newPath,
          address: address,
          location: location,
        },
      });
    } catch (error) {
      throw error;
    }
  };
};

export const fetchPlaces = () => {
  return async (dispatch) => {
    try {
      // await clearTable();
      const response = await fetch(`${Config.localhost}/api/place`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const respData = await response.json();
      dispatch({ type: FETCH_PLACES, places: respData.data });
    } catch (error) {
      throw error;
    }
  };
};
export const fetchFavorite = (userId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${Config.localhost}/api/user/${userId}/place`,
        { method: "GET" }
      );
      const resData = await response.json()
      dispatch({ type: FETCH_FAVORITE, data: resData.data });
    } catch (error) {
      throw error;
    }
  };
};
