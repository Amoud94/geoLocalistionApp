import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

const MapScreen = (props) => {
  const location = props.route ? props.route.params.initialLocation : null;
  const readonly = props.route ? props.route.params.readonly : null;

  const [pickedLocation, setPickedLocation] = useState(location);

  const region = {
    latitude: 34.0216376,
    longitude: -6.8508707,
    latitudeDelta: 0.0099,
    longitudeDelta: 0.0009,
  };

  const onSelectHandler = (event) => {
    if (readonly) {
      return;
    }
    setPickedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  const onSaveHandleer = useCallback(() => {
    if (!pickedLocation) {
      //show alert
      return;
    }
    props.navigation.navigate("newPlace", {
      coordination: pickedLocation,
    });
  }, [pickedLocation]);

  useLayoutEffect(() => {
    if (readonly) {
      props.navigation.setOptions({
        title: "Map",
      });
    }
    if (!readonly) {
      props.navigation.setOptions({
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title="save"
              iconName={
                Platform.OS === "android" ? "md-save-outline" : "ios-save"
              }
              onPress={onSaveHandleer}
            />
          </HeaderButtons>
        ),
        title: "Map",
      });
    }
  }, [onSaveHandleer]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={onSelectHandler}
    >
      {pickedLocation && (
        <Marker
          draggable
          coordinate={pickedLocation}
          onDragEnd={(e) =>
            setPickedLocation({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            })
          }
        />
      )}
    </MapView>
  );
};


const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
export default MapScreen;
