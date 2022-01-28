import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "../../Config";
export const SIGNUP = "SIGNUP";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const AUTO_LOGGIN = "AUTO_LOGGIN";

const storeData = async (userID, userToken, isSignedIn) => {
  try {
    await AsyncStorage.setItem(
      "userData",
      JSON.stringify({
        userID: userID,
        userToken: userToken,
        isSignedIn: isSignedIn,
      })
    );
  } catch (error) {
    throw error;
  }
};

export const autoLoggin = () => {
  return {
    type: AUTO_LOGGIN,
  };
};

export const authenticate = (userId, token, isSignedIn) => {
  return (dispatch) => {
    dispatch({
      type: AUTHENTICATE,
      userID: userId,
      token: token,
      isSignedIn: isSignedIn,
    });
  };
};

export const signup = (
  firstname,
  lastname,
  address,
  email,
  phonenumber,
  birthay,
  sexe,
  username,
  password
) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${Config.localhost}/auth/signup`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          address: address,
          email: email,
          phonenumber: phonenumber,
          birthay: birthay,
          sexe: sexe,
          username: username,
          password: password,
        }),
      });
      const resData = await response.json();
      console.log("result:", resData);
      if (response.status === 500) {
        const errorRespData = await resData.error;
        throw new Error(errorRespData);
      }
      dispatch(authenticate(resData.data._id, null, false));
    } catch (error) {
      throw error;
    }
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      console.log("inside login function");
      const response = await fetch(`${Config.localhost}/auth/signin`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const resData = await response.json();
      if (response.status === 404) {
        const errorRespData = resData.message;
        throw new Error(errorRespData);
      }
      console.log("login response", resData);
      dispatch(authenticate(resData.id, resData.accessToken, true));
      await storeData(resData.id, resData.accessToken, true);
    } catch (error) {
      throw error;
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await AsyncStorage.removeItem("userData");
    } catch (error) {
      throw error;
    }
    dispatch({ type: LOGOUT });
  };
};
