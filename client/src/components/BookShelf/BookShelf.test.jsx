import { render } from "@testing-library/react";
import BookShelf from "./BookShelf";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter as Router } from "react-router-dom";

test("render BookShelf static elements", () => {
  const { getByTestId } = render(<BookShelf />);
  const bookShelfContainerDiv = getByTestId("bookShelfContainerDiv");
  const wantToReadContainerCard = getByTestId("wantToReadContainerCard");
  const wantToReadCardBody = getByTestId("wantToReadCardBody");
  const wantToReadCardHeader = getByTestId("wantToReadCardHeader");
  const currentlyReadingCardContainer = getByTestId(
    "currentlyReadingCardContainer"
  );
  const currentlyReadingCardBody = getByTestId("currentlyReadingCardBody");
  const currentlyReadingCardHeader = getByTestId("currentlyReadingCardHeader");
  const readCardContainer = getByTestId("readCardContainer");
  const readCardBody = getByTestId("readCardBody");
  const readCardHeader = getByTestId("readCardHeader");

  [
    bookShelfContainerDiv,
    wantToReadContainerCard,
    wantToReadCardBody,
    wantToReadCardHeader,
    currentlyReadingCardContainer,
    currentlyReadingCardBody,
    currentlyReadingCardHeader,
    readCardContainer,
    readCardBody,
    readCardHeader,
  ].forEach((element) => {
    expect(element).toBeInTheDocument();
  });
});

let data = {
  books: {
    wantToRead: [],
    currentlyReading: [],
    read: [],
  },
};

const server = setupServer(
  rest.get("/api/bookshelf", (req, res, ctx) => {
    return res(ctx.json(data));
  })
);

beforeAll(() => {
  // Establish requests interception layer before all tests.
  server.listen();
});

afterAll(() => {
  // Clean up after all tests are done, preventing this
  // interception layer from affecting irrelevant tests.
  server.close();
});

test("mockAPI Call test for alertComponents", async () => {
  const wrapper = render(<BookShelf />);

  expect(await wrapper.findAllByTestId("alertComponent")).toHaveLength(3);
});

test("mockAPI Call test for Book components", async () => {

  data = {
    books: {
      wantToRead: [{ title: "Test1", bookId: "0324980" }],
      currentlyReading: [{ title: "Test2", bookId: "0324981" }],
      read: [{ title: "Test3", bookId: "0324982" }],
    },
  };

  server.use(
    rest.get("/api/bookshelf", (req, res, ctx) => {
      return res(ctx.json(data));
    })
  );

  const wrapper = render(
    <Router>
      <BookShelf />
    </Router>
  );

  expect(await wrapper.findAllByTestId("book")).toHaveLength(3);
});
