import { render, fireEvent } from "@testing-library/react";
import Nav from "./Nav";

//check all static elements are in the document

test("should render the LoginForm Component Static Elements", () => {
  const { getByTestId, getByLabelText } = render(<Nav />);
  

  [].forEach((element) => {
    expect(element).toBeInTheDocument();
  });
});