import { useState, useContext, useEffect}  from 'react';
import { ListGroup, Alert } from 'react-bootstrap';
import styles from './Book.module.css';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';

const Book = ({title, image, bookId}) => {

    const { state } = useContext(AuthContext);

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

    return (
      <div>
        <span>
          <img id={styles["img"]} src={image} alt={title} />
        </span>
        <ListGroup id={styles["ul"]} className="mt-auto mb-auto">
          <ListGroup.Item>
            <a href="f">{title}</a>
          </ListGroup.Item>
          <ListGroup.Item>Change Shelf:</ListGroup.Item>
          <ListGroup.Item>
            <select
              onChange={(e) => {
                // switchToAnotherShelf(bookId, e.target.value);
                switchToAnotherShelf(bookId, e.target.value)
              }}
            >
              <option defaultValue>Select shelf</option>
              <option value="wantToRead">Want To Read</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="read">Read</option>
            </select>
          </ListGroup.Item>
        </ListGroup>
        <hr />
      </div>
    );
}

export default Book;
