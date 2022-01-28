import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import { PlacesStackNavigator } from "./navigation/PlacesNavigator";
import AppNavigator from "./navigation/AppNavigator";
import "react-native-gesture-handler";

import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { init } from "./helpers/db";
import placesReducer from "./store/reducers/Places";
import authReducer from "./store/reducers/Auth";

init()
  .then(() => {
    console.log("initialized DB");
  })
  .catch((err) => {
    console.log("initialize db failed");
  });

const mainReducer = combineReducers({
  auth: authReducer,
  places: placesReducer,
});

const store = createStore(mainReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
