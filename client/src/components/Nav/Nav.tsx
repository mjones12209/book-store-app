import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import { BsSearch } from "react-icons/bs";
import { AuthContext } from "../../context/AuthContext";
import axios, { AxiosResponse } from "axios";

const Nav: React.FC<{}> = () => {
  const { state, dispatch } = useContext(AuthContext);

  const signOut: Function = async () => {
    try {
      const asyncResponse: AxiosResponse<any> = await axios({
        method: "DELETE",
        url: "api/signout",
        headers: {
          Authorization: `Bearer ${state.token}`,
          "Content-Type": "application/json",
        },
      });
      if (asyncResponse.status === 200) {
        window.localStorage.removeItem("refresh");
        dispatch({ type: "LOGOUT" });
      }
    } catch (e:any) {
      dispatch({ type: "LOGOUT" });
      console.log(e);
    }
  };

  return (
    <>
      <nav
        data-testid="navElement"
        id={styles["nav-edit"]}
        className="nav bg-light d-flex justify-content-between"
      >
        <Link data-testid="bookshelfNavLink" className="nav-link" to="/bookshelf">
          My Bookshelf
        </Link>
        {state.isLoggedIn && (
          <button data-testid="signOutButton" className="nav-link" onClick={() => signOut()}>
            Sign Out
          </button>
        )}
        <Link data-testid="searchNavLink" className="nav-link" to="/search">
          {<BsSearch />} Search
        </Link>
      </nav>
    </>
  );
};

export default Nav;
