import React from "react";
import { useDispatch } from "react-redux";
import { Platform, View, StatusBar, SafeAreaView, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";

import { Ionicons } from "@expo/vector-icons";

import * as authActions from "../store/actions/Auth";

import Colors from "../constant/Colors";

import AuthScreen from "../screens/AuthScreen";
import SingUpSreen from "../screens/SingUpSreen";
import MapScreen, { MapScreenOptions } from "../screens/MapScreen";
import FavoritePlacesScreen, {
  FavoritePlacesScreenOptions,
} from "../screens/FavoritePlacesScreen";
import NewPlaceScreen, {
  NewPlaceScreenOption,
} from "../screens/NewPlaceScreen";
import PlaceDetailsScreen, {
  PlaceDetailsScreenOption,
} from "../screens/PlaceDetailsScreen";
import ViewPlacesScreen, {
  ViewPlacesScreenOptions,
} from "../screens/ViewPlacesScreen";

const AppStackNavigator = createNativeStackNavigator();
const AuthStackNavigator = createNativeStackNavigator();
const FavoriteStackNavigator = createNativeStackNavigator();

const MainDrawerNavigator = createDrawerNavigator();

const navigationOptions = {
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
};

export const AuthenticationNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={navigationOptions}>
      <AuthStackNavigator.Screen
        name="authScreen"
        component={AuthScreen}
        options={{ headerShown: false }}
      />
      <AuthStackNavigator.Screen
        name="registerScreen"
        component={SingUpSreen}
        options={{ title: "Create a new account" }}
      />
    </AuthStackNavigator.Navigator>
  );
};

export const FavPlacesNavigator = () => {
  return (
    <FavoriteStackNavigator.Navigator screenOptions={navigationOptions}>
      <FavoriteStackNavigator.Screen
        name="favPlaces"
        component={FavoritePlacesScreen}
        options={FavoritePlacesScreenOptions}
      />
      <FavoriteStackNavigator.Screen
        name="placeDetails"
        component={PlaceDetailsScreen}
        options={PlaceDetailsScreenOption}
      />
    </FavoriteStackNavigator.Navigator>
  );
};

export const PlacesStackNavigator = () => {
  return (
    <AppStackNavigator.Navigator screenOptions={navigationOptions}>
      <AppStackNavigator.Screen
        name="placesList"
        component={ViewPlacesScreen}
        options={ViewPlacesScreenOptions}
      />
      <AppStackNavigator.Screen
        name="placeDetails"
        component={PlaceDetailsScreen}
        options={PlaceDetailsScreenOption}
      />
      <AppStackNavigator.Screen
        name="newPlace"
        component={NewPlaceScreen}
        options={NewPlaceScreenOption}
      />
      <AppStackNavigator.Screen name="mapScreen" component={MapScreen} />
    </AppStackNavigator.Navigator>
  );
};

export const MainNavigator = () => {
  const dispatch = useDispatch();

  return (
    <MainDrawerNavigator.Navigator
      screenOptions={navigationOptions}
      drawerContent={(props) => {
        return (
          <SafeAreaView
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "space-between",
              backgroundColor: "white",
              paddingTop:
                Platform.OS === "android" ? StatusBar.currentHeight : 0,
            }}
          >
            <View
              style={{
                flex: 1,
                paddingTop: 10,
              }}
            >
              <DrawerItemList {...props} />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                paddingBottom: 10,
              }}
            >
              <Button
                title="Logout"
                color={Colors.primary}
                onPress={() => {
                  dispatch(authActions.logout());
                }}
              />
            </View>
          </SafeAreaView>
        );
      }}
    >
      <MainDrawerNavigator.Screen
        name="Places"
        component={PlacesStackNavigator}
        options={{
          drawerIcon: () => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
            />
          ),
          headerShown: false,
        }}
      />
      <MainDrawerNavigator.Screen
        name="Favorite"
        component={FavPlacesNavigator}
        options={{
          drawerIcon: () => (
          <Ionicons
            name={Platform.OS === "android" ? "md-star-outline" : "ios-star"}
            size={23}
          />
        ),
        headerShown: false,
      }}
      />
    </MainDrawerNavigator.Navigator>
  );
};
