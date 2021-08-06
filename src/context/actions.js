import apiClient from "../services/api";

export async function getCSRF(dispatch, email, password) {
  //Todo : device name
  const device_name = "Merry's Phone";

  try {
    dispatch({ type: "REQUEST_CSRF" });

    let response = await apiClient.post("/sanctum/token", {
      email,
      password,
      device_name
    });

    dispatch({ type: "CSRF_SUCCESS", payload: { token: response.data } });
    //Todo: useContext
    apiClient.defaults.headers["Authorization"] = "Bearer " + response.data;
    //localStorage.setItem("token", JSON.stringify(response.data));

    return response;
  } catch (error) {
    dispatch({ type: "CSRF_ERROR", error: error });
  }
}

export async function loginUser(dispatch, email, password) {
  //Todo : device name
  const device_name = "Merry's Phone";

  try {
    dispatch({ type: "REQUEST_LOGIN" });

    //Todo: useContext
    let response = await apiClient.post("/login", {
      email,
      password,
      device_name
    });

    let data = await response.data;

    if (data.email) {
      dispatch({ type: "LOGIN_SUCCESS", payload: { user: data } });
      localStorage.setItem("currentUser", JSON.stringify(data));
      return data;
    }

    dispatch({ type: "LOGIN_ERROR", error: data.errors[0] });
    return;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
}
