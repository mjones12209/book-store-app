import { createContext, useReducer } from "react";

const reducer = (bookState, action) => {
  switch (action.type) {
    case "ADD_BOOK":
      return { ...bookState, book: action.payload};
    default:
      return bookState;
  }
};

const initialState = {};

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
