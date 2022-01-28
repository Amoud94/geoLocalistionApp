import React from "react";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapPreview = (props) => {
  return (
    <TouchableOpacity style={styles.mapPreview} onPress={props.onSelect} >
        {props.location ? (
          <MapView
            style={styles.map}
            region={{
              latitude: props.location.latitude,
              longitude: props.location.longitude,
              latitudeDelta: 0.0012,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: props.location.latitude,
                longitude: props.location.longitude,
              }}
              title={props.title}
            />
          </MapView>
        ) : (
          props.children
        )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
    width:360,
    height: 200,
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 0.3,
    borderRadius: 1,
    overflow:'hidden'
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapPreview;
