import React from "react";
import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constant/Colors";

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      IconComponent={Ionicons}
      color={Platform.OS === 'android' ? 'white' : Colors.primary}
      iconSize={21}
      {...props}
    />
  );
};

export default CustomHeaderButton;
