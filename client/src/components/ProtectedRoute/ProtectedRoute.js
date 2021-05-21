import { useContext } from 'react';
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ children}) => {

    const { state } = useContext(AuthContext);

  return state.isLoggedIn ? <Route>{children}</Route> : <Redirect to="/login" />;
};

export default ProtectedRoute;