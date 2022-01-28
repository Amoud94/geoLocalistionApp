import React, {
  useEffect,
  useLayoutEffect,
  useCallback,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TouchableOpacity,
  ScrollView,
  Image,
  View,
  Text,
  Alert,
  StyleSheet,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { toggleFavorite } from "../store/actions/Places";

const PlaceDetailsScreen = (props) => {
  const { navigation, route } = props;
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const placeId = route ? route.params.placeId : null;

  const userId = useSelector((state) => state.auth.userID);

  const selectedPlace = useSelector((state) =>
    state.places.placesList.find((place) => place.id === placeId)
  );

  const toggleFavHandler = useCallback(() => {
    try {
      dispatch(toggleFavorite(userId, placeId));
    } catch (error) {
      setError(error);
    }
  }, [dispatch, placeId]);

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred,", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const currentPlaceIsFavorite = useSelector((state) =>
    state.places.favoritePlaces.some((place) => place.id === placeId)
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="fav"
            iconName={currentPlaceIsFavorite ? "ios-star" : "ios-star-outline"}
            color="yellow"
            onPress={toggleFavHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [toggleFavHandler, currentPlaceIsFavorite]);

  const onPressHandler = () => {
    navigation.navigate("mapScreen", {
      readonly: true,
      initialLocation: {
        latitude: selectedPlace.latitude,
        longitude: selectedPlace.longitude,
      },
    });
  };
  return (
    <ScrollView>
      <Image source={{ uri: selectedPlace.imgUrl }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace.address}</Text>
        </View>
        <TouchableOpacity style={styles.mapPreview} onPress={onPressHandler}>
          <MapView
            style={styles.mapPreview}
            scrollEnabled={false}
            region={{
              latitude: selectedPlace.latitude,
              longitude: selectedPlace.longitude,
              latitudeDelta: 0.0032,
              longitudeDelta: 0.0031,
            }}
          >
            <Marker
              coordinate={{
                latitude: selectedPlace.latitude,
                longitude: selectedPlace.longitude,
              }}
            />
          </MapView>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc",
  },
  locationContainer: {
    flex: 1,
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: "black",
    textAlign: "center",
  },
  mapPreview: {
    width: "100%",
    height: 400,
    maxWidth: 400,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export const PlaceDetailsScreenOption = ({ route }) => {
  return {
    title: route.params.placeTitle,
  };
};
export default PlaceDetailsScreen;
