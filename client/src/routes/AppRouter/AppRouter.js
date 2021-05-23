import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import Nav from "../../components/Nav/Nav";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Search from '../../components/Search/Search';
import Home from '../../components/Home/Home';
import BookShelf from '../../components/BookShelf/BookShelf';


const AppRouter = () => {
    return (
      <>
        <Router>
          <Nav />
          <Switch>
            <Route path="/login">
              <LoginForm />
            </Route>

            <ProtectedRoute exact path="/home">
              <Home />
            </ProtectedRoute>

            <ProtectedRoute exact path="/search">
              <Search />
            </ProtectedRoute>

            <ProtectedRoute exact path="/bookshelf">
              <BookShelf />
            </ProtectedRoute>

            <ProtectedRoute exact path="/bookdetails">
              <BookShelf />
            </ProtectedRoute>

            <Redirect to="/login" />

          </Switch>
        </Router>
      </>
    );
}

export default AppRouter
