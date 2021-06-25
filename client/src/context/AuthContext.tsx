import React from "react";
import { createContext, useReducer, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { useHistory } from "react-router-dom";

interface State {
  isLoggedIn: boolean;
  token: string | null;
}

const initialState = {
  isLoggedIn: false,
  token: null,
};

type Action =
  | { type: "LOGIN"; payload: { isLoggedIn: boolean; token: string | null } }
  | { type: "LOGOUT"; payload: { isLoggedIn: boolean; token: null } }
  | {
      type: "UPDATE_TOKEN";
      payload: { isLoggedIn: boolean; token: string | null };
    };

const reducer:React.Reducer<State, Action> = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
      };
    case "LOGOUT":
      return { isLoggedIn: false, token: null };
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

export const AuthContext = createContext<{
  state: State;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

const AuthContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const history = useHistory();

  useEffect(() => {
    const refreshToken:Function = async () => {
      try {
        const asyncResponse:AxiosResponse<any> = await axios({
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
        console.log(e.message);
      }
    };
    refreshToken();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
