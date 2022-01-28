import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  Platform,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import PlaceHolder from "../components/PlaceHolder";
import * as placesActions from "../store/actions/Places";

const ViewPlacesScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.auth.userID);
  const placesList = useSelector((state) => state.places.placesList);
  // const favoritePlaces = useSelector((state) => state.places.favoritePlaces);

  useEffect(() => {
    try {
      setIsLoading(true);
      dispatch(placesActions.fetchPlaces(userID));
      dispatch(placesActions.fetchFavorite(userID))
      setIsLoading(false);
    } catch (error) {}
  }, [dispatch]);
  
  const renderPlaces = (itemData) => {
    // const isFav = favoritePlaces.some(
    //   (place) => place.id === itemData.item.id
    // );
    return (
      <PlaceHolder
        image={itemData.item.imgUrl}
        title={itemData.item.title}
        address={itemData.item.address}
        onSelect={() => {
          navigation.navigate("placeDetails", {
            placeTitle: itemData.item.title,
            placeId: itemData.item.id,
            // isFav: isFav,
          });
        }}
      />
    );
  };
  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }
  if (!isLoading && placesList.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>No places found, Maybe start adding some !</Text>
      </View>
    );
  }
  return (
    <View>
      <FlatList
        data={placesList}
        keyExtractor={(item, index) => item.id}
        renderItem={renderPlaces}
      />
    </View>
  );
};

export const ViewPlacesScreenOptions = ({ navigation }) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="menu"
          iconName="ios-menu"
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="menu"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            navigation.navigate("newPlace");
          }}
        />
      </HeaderButtons>
    ),
    title: "Places list",
  };
};
export default ViewPlacesScreen;
