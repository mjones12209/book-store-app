import { useContext, useState } from "react";
import { Card, Alert } from "react-bootstrap";
import { BookContext } from "../../context/BookContext";
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";

const BookDetails = () => {
  const { bookState } = useContext(BookContext);
  const { state } = useContext(AuthContext);


  const [ successMessage, setSuccessMessage] = useState();
  const [ errorMessage, setErrorMessage] = useState();


  const switchToAnotherShelf = async (id, whichShelf) => {
    try {
      const asyncResponse = await axios({
        method: "PUT",
        url: `/api/bookshelf/${id}/${whichShelf}`,
        headers: {
          Authorization: `Bearer ${state.token}`,
          "Content-Type": "application/json",
        },
      });
      if(asyncResponse.status === 200) {
        setSuccessMessage("Book was successfully moved!")
      }
    } catch (e) {
      setErrorMessage(e.message)
    }
  };


  return (
    <>
    {successMessage && <Alert className="mt-1" variant="success">{successMessage}</Alert>}
    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Card
        style={{
          marginLeft: "1%",
          padding: "8px",
          flexDirection: "row",
          width: "98%",
        }}
      >
        <img
          src={bookState.book.imageLinks.smallThumbnail}
          alt={bookState.book.title}
          style={{ width: "10%", height: "10%" }}
        />
        <div style={{ marginLeft: "8px" }}>
          <h4>{bookState.book.title}</h4>
          <strong>Authors:</strong>
          <p>{bookState.book.authors}</p>
          <p>{bookState.book.description}</p>
          <strong>Publisher: </strong> {bookState.book.publisher}
          <br />
          <strong>Published Date:</strong> {bookState.book.publishedDate}

        <div className="mt-3">
          <p>Change Shelf:</p>
          <select
            onChange={(e) => {
              switchToAnotherShelf(bookState.book.id, e.target.value);
            }}
          >
            <option defaultValue>Select shelf</option>
            <option value="wantToRead">Want To Read</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="read">Read</option>
          </select>
        </div>
        </div>
        < br />
      </Card>
    </>
  );
};

export default BookDetails;
