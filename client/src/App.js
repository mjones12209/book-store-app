import LoginForm from "./components/LoginForm/LoginForm";
import Nav from "./components/Nav/Nav";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import AuthContextProvider from './context/AuthContext';

function App() {
  return (
    <>
    <AuthContextProvider>
      <Nav />
      <Router>
        <Switch>
          <Route exact path="/login">
            <LoginForm />
          </Route>

          <ProtectedRoute exact path="/home">
            <h1>Protected Route</h1>
          </ProtectedRoute>

          <Route>
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Router>
    </AuthContextProvider>
    </>
  );
}

export default App;
