import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import Nav from "../../components/Nav/Nav";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Search from "../../components/Search/Search";
import BookShelf from "../../components/BookShelf/BookShelf";
import BookContextProvider from "../../context/BookContext";
import BookDetails from "../../components/BookDetails/BookDetails";
import AuthContextProvider from "../../context/AuthContext";

const AppRouter = () => {
  return (
    <>
      <Router>
        <AuthContextProvider>
          <Nav />
          <Switch>
            <Route path="/login">
              <LoginForm />
            </Route>

            <ProtectedRoute exact path="/search">
              <Search />
            </ProtectedRoute>

            <ProtectedRoute exact path="/bookshelf">
              <BookShelf />
            </ProtectedRoute>

            <ProtectedRoute exact path="/bookdetails">
              <BookContextProvider>
                <BookDetails />
              </BookContextProvider>
            </ProtectedRoute>

            <Redirect to="/login" />
          </Switch>
        </AuthContextProvider>
      </Router>
    </>
  );
};

export default AppRouter;
