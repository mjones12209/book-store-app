import { useState, useEffect, useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { BookContext } from "../../../context/BookContext";

const SearchResult = ({ title, author, desc, image, bookId }) => {
  const [showFullDesc, setShowFullDesc] = useState(true);
  const [variableDesc, setVariableDesc] = useState(null);
  const [error, setError] = useState();
  const [whichShelf, setWhichShelf] = useState("wantToRead");

  const { bookState, dispatch } = useContext(BookContext);

  const addToShelf = (bookId, whichShelf) => {
      console.log(whichShelf)
    dispatch({
      type: "ADD_BOOK",
      payload: {bookId: bookId, shelf: whichShelf },
    });
  };

  useEffect(() => {
    if (desc === "") {
      setError("Sorry there was no description available");
    }
    setVariableDesc(showFullDesc ? desc.substring(0, 0) : desc);
  }, [showFullDesc, desc]);

  return (
    <span>
      <Card style={{ width: "18rem" }} className="mb-1 text-center">
        <Card.Img
          variant="top"
          src={image}
          style={{ width: "286px", height: "250px" }}
        />
        <Card.Body>
          <Card.Title>
            <span style={{ fontWeight: "600" }}>{title}</span>
            {<br />}
            <h6 className="mt-1">By {author}</h6>
          </Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}

          {<hr key={Math.random()} />}
          {!showFullDesc && <strong key={Math.random() + 3}>Description</strong>}
          <Card.Text className="border-1">
            {variableDesc === ""
              ? null
              : [
                  variableDesc,
                ]}
          </Card.Text>
          {!error && (
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
            <option value="wantToRead" selected>
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
    </span>
  );
};

export default SearchResult;
