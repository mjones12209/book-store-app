import { render } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Nav from "./Nav";

//check all static elements are in the document

test("should render the LoginForm Component Static Elements", () => {
  const { getByTestId } = render(
    <Router>
      <Nav />
    </Router>
  );
  const navElement = getByTestId("navElement");
  const bookshelfNavLink = getByTestId("bookshelfNavLink");
  const searchNavLink = getByTestId("searchNavLink");

  [navElement, bookshelfNavLink, searchNavLink].forEach((element) => {
    expect(element).toBeInTheDocument();
  });
});


test("check to see if the SignOut button is conditionally rendered", () => {
  const element = render(
    (
      <AuthContext.Provider value={{state: {isLoggedIn: true}}}>
          <Router>
             <Nav />
          </Router>
      </AuthContext.Provider>
    )
  );
  expect(element.getByTestId("signOutButton")).toBeInTheDocument();
});