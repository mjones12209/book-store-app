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

interface bookProps {
  title: string | undefined;
  key: string | undefined;
  image: string | undefined;
  bookId: string | undefined;
  setBookShelfData: React.SetStateAction<any>;
  bookShelfData: object;
}

const BookShelf: React.FC<{}> = () => {
  const { state } = useContext(AuthContext);
  const [bookShelfData, setBookShelfData] = useState<bookShelfData>();

  useEffect(() => {
    let isMounted: boolean = true;
      const getBookShelfDataRequest: Function = async ()=> {
        const response: AxiosResponse = await axios.get("/api/bookshelf", {
          headers: {
            Authorization: `Bearer ${state.token}`,
            "Content-Type": "application/json",
          }
        });
        if (response.status === 200 && isMounted) {
          setBookShelfData(response.data.books);
        }
      }
      getBookShelfDataRequest();
      return () => isMounted = false as any;
  }, [state.token]);

  return (
    <div
      data-testid="bookShelfContainerDiv"
      id={styles["categories"]}
      className="mt-3"
    >
      <Card data-testid="wantToReadContainerCard" style={{ width: "80%" }}>
        <Card.Body data-testid="wantToReadCardBody">
          <Card.Header data-testid="wantToReadCardHeader" as="h5">
            Want To Read
          </Card.Header>
          {bookShelfData &&
            bookShelfData.wantToRead.map((book, index) => {
              let image;

              if (book.imageLinks === "" || book.imageLinks === undefined) {
                image =
                  "https://www.escapeauthority.com/wp-content/uploads/2116/11/No-image-found.jpg";
              } else {
                image = book.imageLinks.smallThumbnail;
              }

              const bookProps: bookProps = {
                title: book.title,
                key: `book-${index}`,
                image: image,
                bookId: book.id,
                setBookShelfData: setBookShelfData,
                bookShelfData: bookShelfData,
              };

              return <Book {...bookProps} />;
            })}
          {bookShelfData && bookShelfData.wantToRead.length === 0 ? (
            <Alert
              data-testid="alertComponent"
              variant="secondary"
              className="mt-1"
            >
              You have no books currently in this shelf.
            </Alert>
          ) : null}
        </Card.Body>
      </Card>
      <Card
        data-testid="currentlyReadingCardContainer"
        style={{ width: "80%" }}
        className="mt-3"
      >
        <Card.Body data-testid="currentlyReadingCardBody">
          <Card.Header data-testid="currentlyReadingCardHeader" as="h5">
            Currently Reading
          </Card.Header>
          {bookShelfData &&
            bookShelfData.currentlyReading.map((book, index) => {
              let image;

              if (book.imageLinks === "" || book.imageLinks === undefined) {
                image =
                  "https://www.escapeauthority.com/wp-content/uploads/2116/11/No-image-found.jpg";
              } else {
                image = book.imageLinks.smallThumbnail;
              }

              const bookProps: bookProps = {
                title: book.title,
                key: `book-${index}`,
                image: image,
                bookId: book.id,
                setBookShelfData: setBookShelfData,
                bookShelfData: bookShelfData,
              };

              return <Book {...bookProps} />;
            })}
          {bookShelfData && bookShelfData.currentlyReading.length === 0 ? (
            <Alert
              data-testid="alertComponent"
              variant="secondary"
              className="mt-1"
            >
              You have no books currently in this shelf.
            </Alert>
          ) : null}
        </Card.Body>
      </Card>
      <Card
        data-testid="readCardContainer"
        style={{ width: "80%" }}
        className="mt-3 mb-3"
      >
        <Card.Body data-testid="readCardBody">
          <Card.Header data-testid="readCardHeader" as="h5">
            Read
          </Card.Header>
          {bookShelfData &&
            bookShelfData.read.map((book, index) => {
              let image;

              if (book.imageLinks === "" || book.imageLinks === undefined) {
                image =
                  "https://www.escapeauthority.com/wp-content/uploads/2116/11/No-image-found.jpg";
              } else {
                image = book.imageLinks.smallThumbnail;
              }

              const bookProps: bookProps = {
                title: book.title,
                key: `book-${index}`,
                image: image,
                bookId: book.id,
                setBookShelfData: setBookShelfData,
                bookShelfData: bookShelfData,
              };

              return <Book {...bookProps} />;
            })}
          {bookShelfData && bookShelfData.read.length === 0 ? (
            <Alert
              data-testid="alertComponent"
              variant="secondary"
              className="mt-1"
            >
              You have no books currently in this shelf.
            </Alert>
          ) : null}
        </Card.Body>
      </Card>
    </div>
  );
};

export default BookShelf;
