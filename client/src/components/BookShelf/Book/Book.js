import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import styles from "./Book.module.css";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";

const Book = ({ title, image, bookId, setBookShelfData }) => {

  const { state } = useContext(AuthContext);

  const deleteBook = async (bookId) => {
    try {
      const asyncResponse = await axios({
        method: "DELETE",
        url: `/api/bookshelf/${bookId}`,
        headers: {
          Authorization: `Bearer ${state.token}`,
          "Content-Type": "application/json",
        },
      });
      if (asyncResponse.status === 200) {
        (async () => {
          const response = await axios({
            method: "GET",
            url: "/api/bookshelf",
            headers: {
              Authorization: `Bearer ${state.token}`,
              "Content-Type": "application/json",
            },
          });
          if (response.status === 200) {
            setBookShelfData(response.data.books);
          }
        })();
      }
    } catch (e) {
      console.log(e.mesesage);
    }
  };

  const switchToAnotherShelf = async (id, whichShelf) => {
    if (whichShelf !== "Select shelf") {
      try {
        const asyncResponse = await axios({
          method: "PUT",
          url: `/api/bookshelf/${id}/${whichShelf}`,
          headers: {
            Authorization: `Bearer ${state.token}`,
            "Content-Type": "application/json",
          },
        });
        if (asyncResponse.status === 200) {
          (async () => {
            const response = await axios({
              method: "GET",
              url: "/api/bookshelf",
              headers: {
                Authorization: `Bearer ${state.token}`,
                "Content-Type": "application/json",
              },
            });
            if (response.status === 200) {
              setBookShelfData(response.data.books);
            }
          })();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div id={styles["bookContainer"]}>
      <img id={styles["img"]} src={image} alt={title} height="193" width="128" />
      <div id={styles["ul"]}>
        <Link
          id={styles["cardLink"]}
          style={{ fontWeight: "600" }}
          to={`/book/${bookId}`}
        >
          {title}
        </Link>
        <div>Change Shelf:</div>
        <select
          onChange={(e) => {
            switchToAnotherShelf(bookId, e.target.value);
          }}
        >
          <option defaultValue>Select shelf</option>
          <option value="wantToRead">Want To Read</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="read">Read</option>
        </select>
        <br />
        <Button
          className="mt-2"
          variant="danger"
          onClick={() => deleteBook(bookId)}
        >
          Remove Book
        </Button>
      </div>
    </div>
  );
};

export default Book;
