import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { AuthenticationNavigator, MainNavigator } from "./PlacesNavigator";
import StartUpScreen from "../screens/StartUpScreen";

const AppNavigator = () => {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const autoLoggedIn = useSelector((state) => state.auth.isAutoLoggedIn);
  return (
    <NavigationContainer>
      {isSignedIn && <MainNavigator />}
      {!isSignedIn && autoLoggedIn && <AuthenticationNavigator />}
      {!isSignedIn && !autoLoggedIn && <StartUpScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
