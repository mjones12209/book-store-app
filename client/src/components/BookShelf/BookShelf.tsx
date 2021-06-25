import React from "react";
import { useContext, useEffect, useState } from "react";
import { Card, Alert } from "react-bootstrap";
import styles from "./BookShelf.module.css";
import { AuthContext } from "../../context/AuthContext";
import axios, { AxiosResponse } from "axios";
import Book from "./Book/Book";

interface bookShelfData {
  wantToRead: Array<any>;
  read: Array<any>;
  currentlyReading: Array<any>;
}

const BookShelf: React.FC<{}> = () => {
  const { state } = useContext(AuthContext);
  const [bookShelfData, setBookShelfData] = useState<bookShelfData>();

  useEffect(() => {
    (async () => {
      const response:AxiosResponse<any> = await axios({
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
  }, [state.token]);

  return (
    <div id={styles["categories"]} className="mt-3">
      <Card style={{ width: "80%" }}>
        <Card.Body>
          <Card.Header as="h5">Want To Read</Card.Header>
          {bookShelfData &&
            bookShelfData.wantToRead.map((book, index) => {
              let image;

              const bookProps = {
                title: book.title,
                key: `book-${index}`,
                image: image,
                bookId: book.id,
                setBookShelfData: setBookShelfData,
                bookShelfData: bookShelfData,
              };

              if (book.imageLinks === "" || book.imageLinks === undefined) {
                image =
                  "https://www.escapeauthority.com/wp-content/uploads/2116/11/No-image-found.jpg";
              } else {
                image = book.imageLinks.smallThumbnail;
              }

              return (
                <Book {...bookProps} />
              );
            })}
          {bookShelfData && bookShelfData.wantToRead.length === 0 ? (
            <Alert variant="secondary" className="mt-1">
              You have no books currently in this shelf.
            </Alert>
          ) : null}
        </Card.Body>
      </Card>
      <Card style={{ width: "80%" }} className="mt-3">
        <Card.Body>
          <Card.Header as="h5">Currently Reading</Card.Header>
          {bookShelfData &&
            bookShelfData.currentlyReading.map((book, index) => {
              let image;

              const bookProps = {
                title: book.title,
                key: `book-${index}`,
                image: image,
                bookId: book.id,
                setBookShelfData: setBookShelfData,
                bookShelfData: bookShelfData,
              };

              if (book.imageLinks === "" || book.imageLinks === undefined) {
                image =
                  "https://www.escapeauthority.com/wp-content/uploads/2116/11/No-image-found.jpg";
              } else {
                image = book.imageLinks.smallThumbnail;
              }

              return (
              <Book {...bookProps} />
              );
            })}
          {bookShelfData && bookShelfData.currentlyReading.length === 0 ? (
            <Alert variant="secondary" className="mt-1">
              You have no books currently in this shelf.
            </Alert>
          ) : null}
        </Card.Body>
      </Card>
      <Card style={{ width: "80%" }} className="mt-3 mb-3">
        <Card.Body>
          <Card.Header as="h5">Read</Card.Header>
          {bookShelfData &&
            bookShelfData.read.map((book, index) => {
              let image;

              const bookProps = {
                title: book.title,
                key: `book-${index}`,
                image: image,
                bookId: book.id,
                setBookShelfData: setBookShelfData,
                bookShelfData: bookShelfData,
              };
              
              if (book.imageLinks === "" || book.imageLinks === undefined) {
                image =
                  "https://www.escapeauthority.com/wp-content/uploads/2116/11/No-image-found.jpg";
              } else {
                image = book.imageLinks.smallThumbnail;
              }

              return (
                <Book {...bookProps}/>
              );
            })}
          {bookShelfData && bookShelfData.read.length === 0 ? (
            <Alert variant="secondary" className="mt-1">
              You have no books currently in this shelf.
            </Alert>
          ) : null}
        </Card.Body>
      </Card>
    </div>
  );
};

export default BookShelf;
