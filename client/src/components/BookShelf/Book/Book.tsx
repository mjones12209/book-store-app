import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import styles from "./Book.module.css";
import axios, { AxiosResponse } from "axios";
import { AuthContext } from "../../../context/AuthContext";

interface Props {
  title: string | undefined;
  image: string | undefined;
  bookId: string | undefined;
  setBookShelfData: React.SetStateAction<any>;
}

const Book: React.FC<Props> = ({ title, image, bookId, setBookShelfData }) => {
  const { state } = useContext(AuthContext);

  const deleteBook: Function = async (bookId: String) => {
    try {
      const asyncResponse: AxiosResponse<any> = await axios({
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

  const switchToAnotherShelf: Function = async (
    id: String,
    whichShelf: String
  ) => {
    if (whichShelf !== "Select shelf") {
      try {
        const asyncResponse: AxiosResponse<any> = await axios({
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
    <div data-testid="book" id={styles["bookContainer"]}>
      <img
        data-testid="bookImage"
        id={styles["img"]}
        src={image}
        alt={title}
        height="193"
        width="128"
      />
      <div data-testid="bookUnorderedList" id={styles["ul"]}>
        <Link
          data-testid="bookLink"
          id={styles["cardLink"]}
          style={{ fontWeight: 600 }}
          to={`/book/${bookId}`}
        >
          {title}
        </Link>
        <div data-testid="changeShelfDiv">Change Shelf:</div>
        <select
          data-testid="changeShelfSelect"
          onChange={(e) => {
            switchToAnotherShelf(bookId, e.target.value);
          }}
        >
          <option data-testid="option" defaultValue="true">
            Select shelf
          </option>
          <option data-testid="option" value="wantToRead">
            Want To Read
          </option>
          <option data-testid="option" value="currentlyReading">
            Currently Reading
          </option>
          <option data-testid="option" value="read">
            Read
          </option>
        </select>
        <br data-testid="breakElement" />
        <Button
          data-testid="removeButton"
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
