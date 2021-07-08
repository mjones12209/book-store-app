import { render } from '@testing-library/react';
import Book from './Book';
import { BrowserRouter as Router } from 'react-router-dom';

test("render Book static elements", () => {
   const { getByTestId, getAllByTestId } = render(
     <Router>
       <Book />
     </Router>
   );

   const BookContainer = getByTestId("book");
   const BookImage = getByTestId("bookImage");
   const bookUnorderedList = getByTestId("bookUnorderedList");
   const bookLink = getByTestId("bookLink");
   const changeShelfDiv = getByTestId("changeShelfDiv");
   const changeShelfSelect = getByTestId("changeShelfSelect");
   const optionElements = getAllByTestId("option");
   const breakElement = getByTestId("breakElement");
   const removeButton = getByTestId("removeButton");

   [
     BookContainer,
     BookImage,
     bookUnorderedList,
     bookLink,
     changeShelfDiv,
     changeShelfSelect,
     breakElement,
     removeButton,
   ].forEach((element) => {
     expect(element).toBeInTheDocument();
   });
   
   expect(optionElements).toHaveLength(4);

});
