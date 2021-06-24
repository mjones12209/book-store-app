import React from 'react';
import { useContext } from "react"
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

interface Props {
  children?: JSX.Element | JSX.Element[];
  exact?: boolean;
  path: string;
}

const ProtectedRoute: React.FC<Props> = ({ children, ...restOfProps }) => {

  const { state } = useContext(AuthContext);

  return state.isLoggedIn ? (
    <Route {...restOfProps}>{children}</Route>
  ) : (
    <Redirect to="/login" />
  );
};

export default ProtectedRoute;
