import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children, ...restOfProps }) => {
  const { state } = useContext(AuthContext);

  return state.isLoggedIn ? (
    <Route {...restOfProps}>{children}</Route>
  ) : (
    <Redirect to="/login" />
  );
};

export default ProtectedRoute;
