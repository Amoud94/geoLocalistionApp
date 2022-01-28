import React, { useState, useEffect} from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Alert
} from "react-native";
import { useDispatch } from "react-redux";

import Card from "../components/Card";
import Colors from "../constant/Colors";
import * as authActions from "../store/actions/Auth";

const AuthScreen = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred,", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const addHandler = async () => {
    const action = authActions.login(
      username,
      password
    );
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(action);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };
  const onPress = () => {
    props.navigation.navigate("registerScreen");
  };

  return (
    <SafeAreaView style={styles.formContainer}>
      <Card style={styles.form}>
        <TextInput
          placeholder="username"
          style={styles.input}
          value={username}
          onChangeText={(text) => setUsername(text)}
          keyboardType="default"
        />
        <TextInput
          placeholder="password"
          style={styles.input}
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          keyboardType="default"
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.button}>
            <Button
              color={Colors.primary}
              title="Sign in"
              onPress={addHandler}
            />
          </View>
          <TouchableOpacity style={styles.txtButton} onPress={onPress}>
            <Text>Create new account</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: "#3a5069",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    padding: 10,
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  button: {
    width: "90%",
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  txtButton: {
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f2f2f2",
    padding: 10,
    width: "90%",
  },
  input: {
    width: "95%",
    borderWidth: 0.3,
    borderRadius: 5,
    borderColor: "#151a21",
    padding: 10,
    marginVertical: 10,
  },
});

export default AuthScreen;
