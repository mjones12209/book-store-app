import React, { CSSProperties } from 'react';
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import styles from "./SearchResult.module.css";

interface Props {
  title: string | null;
  author: string | null;
  desc: object | string | null;
  picture: string | undefined;
  bookId: string | null;
}

const SearchResult:React.FC<Props> = ({ title, author, desc, picture, bookId }) => {

  if( picture === "" || picture === undefined ) {
    picture =
      "https://www.escapeauthority.com/wp-content/uploads/2116/11/No-image-found.jpg";
  }

  const [showFullDesc, setShowFullDesc] = useState<boolean>(true);
  const [variableDesc, setVariableDesc] = useState<string | null>(null);
  const [noDescriptionerror, setNoDescriptionError] = useState<string | null>();
  const [apiError, setApiError] = useState<string | null>();
  const [successfulAdditionMessage, setSuccessfulAdditionMessage] = useState<string | null>();
  const [whichShelf, setWhichShelf] = useState<string | null>("wantToRead");

  const { state } = useContext(AuthContext);

  const addToShelf = async (
    bookId: string | null,
    whichShelf: string | null
  ) => {
    try {
      const asyncResponse = await axios({
        method: "PUT",
        url: `/api/bookshelf/${bookId}/${whichShelf}`,
        headers: {
          Authorization: `Bearer ${state.token}`,
          "Content-Type": "application/json",
        },
      });
      if (asyncResponse.status === 200) {
        setSuccessfulAdditionMessage("Successfully Added!");
      }
    } catch (e) {
      setApiError(e.message);
    }
  };


  useEffect(() => {
    if (desc === "") {
      setNoDescriptionError("Sorry there was no description available");
    }
    setVariableDesc(showFullDesc ? desc.substring(0, 0) : desc);
  }, [showFullDesc, desc]);

  const fontWeight = {
    fontWeight: 'bold' as 'bold'
  }

  return (
    <>
      <Card style={{ width: "18rem" }} className="mb-1 text-center">
        <Card.Img
          variant="top"
          src={picture}
          style={{ width: "286px", height: "250px" }}
        />
        <Card.Body>
          <Link
            id={styles["cardLink"]}
            style={{fontWeight}}
            to={`/book/${bookId}`}
          >
            {title}
          </Link>
          {<br />}
          <h6 className="mt-1">By {author}</h6>
          {noDescriptionerror && (
            <Alert variant="danger">{noDescriptionerror}</Alert>
          )}
          {apiError && <Alert variant="danger">{apiError}</Alert>}
          {successfulAdditionMessage && (
            <Alert variant="success">{successfulAdditionMessage}</Alert>
          )}
          {<hr key={Math.random()} />}
          {!showFullDesc && (
            <strong key={Math.random() + 3}>Description</strong>
          )}
          <Card.Text className="border-1">
            {variableDesc === "" ? null : [variableDesc]}
          </Card.Text>
          {!noDescriptionerror && (
            <Button
              className="mb-1"
              variant="primary"
              onClick={(e) => {
                e.preventDefault();
                setShowFullDesc(!showFullDesc);
              }}
            >
              Read {showFullDesc ? "More" : "Less"}
            </Button>
          )}
          <br />
          <select
            className="mt-1"
            onChange={(e) => {
              setWhichShelf(e.target.value);
            }}
          >
            <option value="wantToRead" defaultValue>
              Want To Read
            </option>
            <option value="currentlyReading">Currenty Reading</option>
            <option value="read">Read</option>
          </select>
          <br />
          <Button
            className="mt-1"
            onClick={() => addToShelf(bookId, whichShelf)}
          >
            Add To Bookshelf
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default SearchResult;
