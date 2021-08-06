let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).user
  : "";
let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("token"))
  : "";

export const initialState = {
  userDetails: "" || user,
  token: "" || token,
  loading: false,
  errorMessage: null
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_CSRF":
      return {
        ...initialState,
        loading: true
      };
    case "CSRF_SUCCESS":
      return {
        ...initialState,
        token: action.payload.token,
        loading: false
      };
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        userDetails: action.payload.user,
        loading: false
      };
    case "LOGOUT":
      return {
        ...initialState,
        userDetails: "",
        token: ""
      };
    case "CSRF_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error
      };

    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
