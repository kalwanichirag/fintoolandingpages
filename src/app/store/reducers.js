const initialState = {
  loggedIn: false,
  leadData: {
    fullname: "",
    mobile: "",
    email: "",
  },
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_LEAD_DATA":
      return {
        ...state,
        leadData: action.payload,
      };
    case "SET_LOGGED_IN":
      return {
        ...state,
        loggedIn: action.payload,
      };
    default:
      return state;
  }
}
