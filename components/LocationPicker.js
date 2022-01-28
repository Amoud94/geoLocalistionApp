import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";
import Colors from "../constant/Colors";
import MapPreview from "./MapPreview";

const LocationPicker = (props) => {
  const { route, navigation, onLocationPicked } = props;
  const [errorMsg, setErrorMsg] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();

  const mapPickedLocation = route.params
    ? route.params.coordination
    : undefined;

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation, onLocationPicked]);

  const getLocationHandler = async () => {
    try {
      setIsFetching(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync();
      setPickedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      props.onLocationPicked({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      let text = "Waiting..";
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
        text = JSON.stringify(location);
      }
    } catch (err) {
      Alert.alert(
        "Could not fetch location!",
        "Please try again later or pick a location on the map.",
        [{ text: "Okay" }]
      );
    }
    setIsFetching(false);
  };

  const mapScreenHandler = () => {
    navigation.navigate("mapScreen", {
      initialLocation: pickedLocation,
      readonly: false,
    });
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview location={pickedLocation} onSelect={mapScreenHandler}>
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreview>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button
            title="Phone location"
            color="orange"
            onPress={getLocationHandler}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Select on map"
            color="orange"
            onPress={mapScreenHandler}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    marginHorizontal: 40,
    width: 140,
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default LocationPicker;
