export const USER_ACTION = {
  // User Sign Up
  SIGN_UP_START: "SIGN_UP_START",
  SIGN_UP_SUCCESS: "SIGN_UP_SUCCESS",
  SIGN_UP_FAIL: "SIGN_UP_FAIL",

  // User Login
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",

  // User Login
  LOGOUT_START: "LOGOUT_START",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAIL: "LOGOUT_FAIL",
};

const UserReducer = (state, action) => {
  switch (action.type) {
    // User Sign Up
    case USER_ACTION.SIGN_UP_START:
      return { user: null, loading: true, error: null };
    case USER_ACTION.SIGN_UP_SUCCESS:
      return { user: action.payload, loading: false, error: null };
    case USER_ACTION.SIGN_UP_FAIL:
      return { error: action.payload, user: null, loading: false };

    // User Sign In
    case USER_ACTION.LOGIN_START:
      return { user: null, loading: true, error: null };
    case USER_ACTION.LOGIN_SUCCESS:
      return { user: action.payload, loading: false, error: null };
    case USER_ACTION.LOGIN_FAIL:
      return { error: action.payload, user: null, loading: false };

    // User Sign Out
    case USER_ACTION.LOGOUT_START:
      return { user: null, loading: true, error: null };
    case USER_ACTION.LOGOUT_SUCCESS:
      return { user: null, loading: false, error: null };
    case USER_ACTION.LOGOUT_FAIL:
      return { error: action.payload, user: null, loading: false };

    default:
      return state;
  }
};

export default UserReducer;
