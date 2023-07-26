import { LOGIN, LOGOUT } from "./actions";

const initialState = { access: false };

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return {
        ...state,
        access: payload,
      };
    case LOGOUT:
      return {
        ...state,
        access: false,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;

//! Analizar crear varios reducers y relacionarlos
