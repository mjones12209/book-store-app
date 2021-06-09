import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Alert } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";


const BookDetails = () => {
  const { state } = useContext(AuthContext);
  
  const { paramBookId } =  useParams();
  
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [bookDetails, setBookDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    try {
      const getMovieDetails = async () => {
        const url = `/api/book/${paramBookId}`;
        const asyncResponse = await axios({
          method: "GET",
          url: url,
          headers: {
            Authorization: `Bearer ${state.token}`,
            "Content-Type": "application/json",
          },
        });
        if (asyncResponse.status === 200) {
          setBookDetails(asyncResponse);
          setIsLoading(false);
        }
      };
      getMovieDetails();
    } catch (e) {
      setIsLoading(false);
      setErrorMessage(e.message)
    }
  }, []);

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
      if (asyncResponse.status === 200) {
        setSuccessMessage("Book was successfully moved!");
      }
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  return (
    <>
      {isLoading && (
        <Alert className="mt-1" variant="secondary">
          Loading....
        </Alert>
      )}
      {successMessage && (
        <Alert className="mt-1" variant="success">
          {successMessage}
        </Alert>
      )}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {bookDetails && (
        <Card
          style={{
            marginTop: "1%",
            marginLeft: "1%",
            padding: "8px",
            flexDirection: "row",
            width: "98%",
          }}
        >
          <img
            src={bookDetails.data.book.imageLinks.smallThumbnail}
            alt={bookDetails.data.book.title}
            style={{ width: "10%", height: "10%" }}
          />
          <div style={{ marginLeft: "8px" }}>
            <h4>{bookDetails.data.book.title}</h4>
            <strong>Authors:</strong>
            <p>{bookDetails.data.book.authors}</p>
            <p>{bookDetails.data.book.description}</p>
            <strong>Publisher: </strong> {bookDetails.data.book.publisher}
            <br />
            <strong>Published Date:</strong>{" "}
            {bookDetails.data.book.publishedDate}
            <div className="mt-3">
              <p>Change Shelf:</p>
              <select
                onChange={(e) => {
                  switchToAnotherShelf(
                    bookDetails.data.book.id,
                    e.target.value
                  );
                }}
              >
                <option defaultValue>Select shelf</option>
                <option value="wantToRead">Want To Read</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="read">Read</option>
              </select>
            </div>
          </div>
          <br />
        </Card>
      )}
    </>
  );
};

export default BookDetails;
