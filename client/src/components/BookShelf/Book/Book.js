import { useContext}  from 'react';
import { useHistory } from 'react-router-dom';
import { ListGroup, Button } from 'react-bootstrap';
import styles from './Book.module.css';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import { BookContext } from '../../../context/BookContext';

const Book = ({title, image, bookId}) => {

    const { state } = useContext(AuthContext);

    const { dispatch } = useContext(BookContext);

    const history = useHistory();

    const deleteBook = async (bookId) => {
      try{
        await axios({
          method: "DELETE",
          url: `/api/bookshelf/${bookId}`,
          headers: {
            Authorization: `Bearer ${state.token}`,
            "Content-Type": "application/json",
          },
        });
      } catch (e) {
        console.log(e.mesesage)
      }
    }

    const switchToAnotherShelf = async(id, whichShelf) => {
      try {
        await axios({
          method: "PUT",
          url: `/api/bookshelf/${id}/${whichShelf}`,
          headers: {
            Authorization: `Bearer ${state.token}`,
            "Content-Type": "application/json",
          },
        });
      } catch (e) {
        console.log(e)
      }
    }

    const viewDetails = async () => {
      try {
        const asyncResponse = await axios({
          method: "GET",
          url: `/api/book/${bookId}`,
          headers: {
            Authorization: `Bearer ${state.token}`,
            "Content-Type": "application/json",
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
    };

    return (
      <div id={styles['bookContainer']}>
        <img id={styles["img"]} src={image} alt={title} />
        <div id={styles["ul"]}>
            <button id={styles['titleLink']} onClick={()=>viewDetails()}><h5>{title}</h5></button>
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
        <hr />
      </div>
    );
}

export default Book;
