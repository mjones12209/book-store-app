import { useContext } from 'react';
import { Card } from "react-bootstrap";
import styles from './BookShelf.module.css';
import { BookContext } from '../../context/BookContext';


const BookShelf = () => {

    const { bookState, dispatch } = useContext(BookContext);

    return (
      <div id={styles["categories"]} className="mt-1">
        <Card style={{ width: "80%" }}>
          <Card.Body>
            <Card.Title>Want To Read</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Card Subtitle
            </Card.Subtitle>
            {bookState.wantToRead.map((book, index) => {
              return <h1>{book}</h1>;
            })}
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
        <Card style={{ width: "80%" }}>
          <Card.Body>
            <Card.Title>Currently Reading</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Card Subtitle
            </Card.Subtitle>
            {/* {bookState.currentlyReading.map((book, index) => {
              return <h1>{book}</h1>;
            })} */}
            {console.log(bookState.currentlyReading)}
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
        <Card style={{ width: "80%" }}>
          <Card.Body>
            <Card.Title>Read</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Card Subtitle
            </Card.Subtitle>
            {/*BOOKS*/}
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
      </div>
    );
}

export default BookShelf;
