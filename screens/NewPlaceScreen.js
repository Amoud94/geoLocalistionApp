import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Button,
} from "react-native";
import { useDispatch } from "react-redux";
import * as Location from "expo-location";

import * as Actions from "../store/actions/Places";
import ImagesPicker from "../components/ImagesPicker";
import LocationPicker from "../components/LocationPicker";
import Colors from "../constant/Colors";

const NewPlaceScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const [selectedAddress, setSelectedAddress] = useState();

  const onImageTakenHandler = (imgPath) => {
    setSelectedImage(imgPath);
  };

  const onLocationPickedHandler = useCallback(
    async (location) => {
      setSelectedLocation(location);
      const address = await Location.reverseGeocodeAsync(location);
      const { country, region, street, streetNumber } = address[0];
      const address_temp = `${street} ${streetNumber}, ${region} ${country} `;
      setSelectedAddress(address_temp);
    },
    [setSelectedLocation, setSelectedAddress]
  );

  const addHandler = () => {
    dispatch(
      Actions.addPlace(title, selectedImage, selectedAddress, selectedLocation)
    );
    navigation.goBack();
  };

  //-------------------View---------------------//
  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
            keyboardType="default"
          />
        </View>
        <ImagesPicker onImageTaken={onImageTakenHandler} />
        <LocationPicker
          navigation={navigation}
          route={route}
          onLocationPicked={onLocationPickedHandler}
        />
        <View style={styles.button}>
          <Button color="green" title="Save" onPress={addHandler} />
        </View>
      </View>
    </ScrollView>
  );
  //---------------------------------------------//
};
const styles = StyleSheet.create({
  form: {
    margin: 30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formControl: {
    width: "100%",
  },
  label: {
    marginVertical: 8,
  },
  input: {
    borderWidth: 0.7,
    borderRadius: 10,
    borderColor: Colors.primary,
    padding: 8,
  },
  button: {
    justifyContent: "center",
    width: "100%",
    marginVertical: 60,
    borderRadius: 10,
    overflow: "hidden",
  },
});
export const NewPlaceScreenOption = ({ navigation }) => {
  return { title: "Add new place " };
};

export default NewPlaceScreen;
