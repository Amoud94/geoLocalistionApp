import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  StatusBar,
  View,
  StyleSheet,
  ScrollView,
  Button,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import { useDispatch } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import * as authActions from "../store/actions/Auth";
import Card from "../components/Card";
import Colors from "../constant/Colors";
import Input from "../components/Input";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const [birthday, setBirthday] = useState(new Date());
  const [sexe, setSexe] = useState();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      firstname: "",
      lastname: "",
      address: "",
      email: "",
      phonenumber: "",
      username: "",
      password: "",
    },
    inputValidities: {
      firstname: false,
      lastname: false,
      address: false,
      email: false,
      phonenumber: false,
      username: false,
      password: false,
    },
    formIsValid: false,
  });
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setBirthday(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };


  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred,", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const authHandler = async () => {
    const action = authActions.signup(
      formState.inputValues.firstname,
      formState.inputValues.lastname,
      formState.inputValues.address,
      formState.inputValues.email,
      formState.inputValues.phonenumber,
      birthday,
      sexe,
      formState.inputValues.username,
      formState.inputValues.password
    );
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(action);
      props.navigation.goBack()
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <SafeAreaView style={styles.formContainer}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.form}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <View style={{ flex: 1, marginRight: 10 }}>
              <Input
                id="firstname"
                label="Firstname"
                keyboardType="default"
                required
                autoCapitalize="none"
                errorText="Please enter a valid value."
                onInputChange={inputChangeHandler}
                initialValue=""
              />
            </View>
            <Input
              id="lastname"
              label="Lastname"
              keyboardType="default"
              required
              autoCapitalize="none"
              errorText="Please enter a valid value."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
          </View>
          <Input
            id="address"
            label="Home address"
            keyboardType="default"
            required
            autoCapitalize="none"
            errorText="Please enter a valid value."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
            }}
          >
            <TextInput
              value={birthday.toDateString()}
              placeholder="Birthday"
              style={styles.input}
              defaultValue={birthday.toDateString()}
              onPressIn={showDatepicker}
            />
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={birthday}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
            <View style={{ marginLeft: 10, width: 150 }}>
              <View style={styles.input}>
                <Picker
                  selectedValue={sexe}
                  onValueChange={(itemValue, itemIndex) => setSexe(itemValue)}
                >
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                </Picker>
              </View>
            </View>
          </View>
          <Input
            id="email"
            label="Email address"
            keyboardType="default"
            required
            autoCapitalize="none"
            errorText="Please enter a valid email address."
            onInputChange={inputChangeHandler}
            initialValue=""
          />

          <Input
            id="phonenumber"
            label="Phone number"
            keyboardType="default"
            required
            autoCapitalize="none"
            errorText="Please enter a valid value."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <Input
            id="username"
            label="Username"
            keyboardType="default"
            required
            autoCapitalize="none"
            errorText="Please enter a valid value."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            autoCapitalize="none"
            errorText="Please enter a valid password."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <View style={styles.buttonsContainer}>
            <View style={styles.button}>
              <Button
                color={Colors.primary}
                title="Register"
                onPress={authHandler}
              />
            </View>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    flexDirection: "row",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#3a5069",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingBottom: 10,
  },
  scrollView: {
    width: "100%",
  },
  form: {
    flex: 1,
    marginTop: 35,
    padding: 10,
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    borderWidth: 0.3,
    borderRadius: 5,
    borderColor: "#151a21",
    paddingLeft: 10,
    marginVertical: 10,
  },
  buttonsContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
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
});

export default AuthScreen;
