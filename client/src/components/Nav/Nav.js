import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import { BsSearch } from "react-icons/bs";

const Nav = () => {

  return (
    <>
      <nav
        id={styles["nav-edit"]}
        className="nav bg-light d-flex justify-content-between"
      >
        <Link className="nav-link" to="/bookshelf">
         My Bookshelf
        </Link>
        <Link className="nav-link" to="/search">
          {<BsSearch />} Search
        </Link>
      </nav>
    </>
  );
};

export default Nav;
