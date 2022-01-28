import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

import Colors from "../constant/Colors";
const ImagesPicker = (props) => {
  const [pickedImage, setPickedImage] = useState(null);

  const takeImageHandler = async () => {
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };
  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <View style={styles.button}>
        <Button title="Take Image" color="orange" onPress={takeImageHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    width: 360,
    borderRadius: 10,
    overflow: "hidden",
  },
  imagePreview: {
    width: 360,
    height: 200,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImagesPicker;
