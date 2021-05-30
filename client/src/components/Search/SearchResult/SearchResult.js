import { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { Card, Button } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { BookContext } from "../../../context/BookContext";
import { AuthContext } from "../../../context/AuthContext";
import axios from 'axios';
import styles from './SearchResult.module.css';

const SearchResult = ({ title, author, desc, image, bookId }) => {
  const [showFullDesc, setShowFullDesc] = useState(true);
  const [variableDesc, setVariableDesc] = useState(null);
  const [noDescriptionerror, setNoDescriptionError] = useState();
  const [apiError, setApiError] = useState();
  const [successfulAdditionMessage, setSuccessfulAdditionMessage] = useState();
  const [whichShelf, setWhichShelf] = useState("wantToRead");

  const history = useHistory();

  const { state } = useContext(AuthContext);
  const { dispatch } = useContext(BookContext);

  const addToShelf = async (bookId, whichShelf) => {
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
        setSuccessfulAdditionMessage("Successfully Added!")
      }
    } catch (e) {
      setApiError(e.message)
    }
  };

  const viewDetails = async () => {
    try {
      const asyncResponse = await axios({
        method: "GET",
        url: `/api/book/${bookId}`,
        headers: {
          Authorization: `Bearer ${state.token}`,
          "Content-Type": "application/json"
        },
      });
      if (asyncResponse.status === 200) {
        dispatch({
          type: "ADD_BOOK",
          payload: asyncResponse.data.book,
        });
        history.push("/bookdetails");
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (desc === "") {
      setNoDescriptionError("Sorry there was no description available");
    }
    setVariableDesc(showFullDesc ? desc.substring(0, 0) : desc);
  }, [showFullDesc, desc]);

  return (
    <>
      <Card style={{ width: "18rem" }} className="mb-1 text-center">
        <Card.Img
          variant="top"
          src={image}
          style={{ width: "286px", height: "250px" }}
        />
        <Card.Body>
          <Card.Link
            id={styles['cardLink']}
            style={{ fontWeight: "600" }}
            onClick={
              (e)=>viewDetails()
            }
          >
            {title}
          </Card.Link>
          {<br />}
          <h6 className="mt-1">By {author}</h6>
          {noDescriptionerror && <Alert variant="danger">{noDescriptionerror}</Alert>}
          {apiError && <Alert variant="danger">{apiError}</Alert>}
          {successfulAdditionMessage && <Alert variant="success">{successfulAdditionMessage}</Alert>}
          {<hr key={Math.random()} />}
          {!showFullDesc && <strong key={Math.random() + 3}>Description</strong>}
          <Card.Text className="border-1">
            {variableDesc === ""
              ? null
              : [
                  variableDesc,
                ]}
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
