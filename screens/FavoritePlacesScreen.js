import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import PlaceHolder from "../components/PlaceHolder";
import CustomHeaderButton from "../components/CustomHeaderButton";

const FavoritePlacesScreen = (props) => {
  const { navigation } = props;
  const favoritePlaces = useSelector((state) => state.places.favoritePlaces);

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
  if (favoritePlaces.length === 0 || !favoritePlaces) {
    return (
      <View style={styles.content}>
        <Text> No favorite meals found. Try to add some </Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={favoritePlaces}
        keyExtractor={(item, index) => item.id}
        renderItem={renderPlaces}
      />
    </View>
  );
};

export const FavoritePlacesScreenOptions = ({ navigation }) => {
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
    title : 'Favorite places'
  };
};
const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default FavoritePlacesScreen;
