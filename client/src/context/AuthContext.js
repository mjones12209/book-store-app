import { createContext, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
        refresh: null
      };
    case "LOGOUT":
      return { initialState };
    case "UPDATE_TOKEN":
      return {
        ...state,
        //refresh token
      };
    default:
      return state;
  }
};

const initialState = {
  isLoggedIn: false,
  token: null,
  refresh: null,
};

export const AuthContext = createContext(initialState);

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;