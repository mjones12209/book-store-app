import { BrowserRouter as Router, Link } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import axios from "axios";
import styles from "./Nav.module.css";
import { BsSearch } from "react-icons/bs";

const Nav = () => {
  // const { state, dispatch } = useContext(AuthContext);

  // const logout = () => {
  //   (async () => {
  //     try {
  //       const asyncResponse = await axios({
  //         method: "POST",
  //         url: process.env.NEXT_PUBLIC_API_URL + "/Logout",
  //         headers: {
  //           "access-token": state.token,
  //         },
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   })();
  // };

  return (
    <>
      <nav
        id={styles["nav-edit"]}
        className="nav bg-light d-flex justify-content-center"
      >
        <Link className="nav-link" to="/home">
          Home
        </Link>
        <Link className="nav-link" to="/bookshelf">
          Bookshelf
        </Link>
        <Link className="nav-link" to="/search">
          {<BsSearch />} Search
        </Link>

      </nav>
    </>
  );
};

export default Nav;
