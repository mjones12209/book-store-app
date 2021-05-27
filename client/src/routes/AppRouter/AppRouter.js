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
import BookShelf from '../../components/BookShelf/BookShelf';
import BookContextProvider from "../../context/BookContext";
import BookDetails from '../../components/BookDetails/BookDetails';


const AppRouter = () => {
    return (
      <>
        <Router>
          <Nav />
          <Switch>
            <Route path="/login">
              <LoginForm />
            </Route>

            <ProtectedRoute exact path="/search">
              <BookContextProvider>
                <Search />
              </BookContextProvider>
            </ProtectedRoute>

            <ProtectedRoute exact path="/bookshelf">
              <BookContextProvider>
               <BookShelf />
              </BookContextProvider>
            </ProtectedRoute>

            <ProtectedRoute exact path="/bookdetails">
              <BookContextProvider>
                <BookDetails />
              </BookContextProvider>
            </ProtectedRoute>

            <Redirect to="/login" />
          </Switch>
        </Router>
      </>
    );
}

export default AppRouter
