import { createContext, useReducer } from "react";

const reducer = (bookState, action) => {
  switch (action.type) {
    case "ADD_BOOK":
      return {
          ...bookState,
          [action.payload.shelf]: new Set([...bookState[action.payload.shelf], action.payload.bookId])
          };
    case "DELETE_BOOK":
      return {
        ...bookState,
        [action.payload.shelf]: bookState.filter((book, index) => {
          return book !== action.payload.bookId
        })
      };
    case "CHANGE_SHELF":
      return;
    case "CLEAR":
        return {initialState}
    default:
      return bookState;
  }
};

const initialState = {
  wantToRead: [],
  currentlyReading: [],
  read: [],
};

export const BookContext = createContext(initialState);

const BookContextProvider = ({ children }) => {
  const [bookState, dispatch] = useReducer(reducer, initialState);

  return (
    <BookContext.Provider value={{ bookState, dispatch }}>
      {children}
    </BookContext.Provider>
  );
};

export default BookContextProvider;
