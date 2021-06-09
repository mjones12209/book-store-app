import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
      };
    case "LOGOUT":
      return { initialState };
    case "UPDATE_TOKEN":
      return {
        ...state,
        token: action.payload.token,
        isLoggedIn: action.payload.isLoggedIn,
      };
    default:
      return state;
  }
};

const initialState = {
  isLoggedIn: false,
  token: null,
};

export const AuthContext = createContext(initialState);

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const history = useHistory();

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const asyncResponse = await axios({
          method: "GET",
          url: "/api/refresh",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (asyncResponse.status === 200) {
          dispatch({
            type: "UPDATE_TOKEN",
            payload: { token: asyncResponse.data.token, isLoggedIn: true },
          });
          history.push("/bookshelf");
        }
      } catch (e) {
        console.log(e.message)
      }
    }
    refreshToken();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
