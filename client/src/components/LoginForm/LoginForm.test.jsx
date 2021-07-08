import { render, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";


//check all static elements are in the document

test("should render the LoginForm Component Static Elements", () => {
  const { getByTestId, getByLabelText } = render(<LoginForm />);
  const LoginFormForm =  getByTestId("loginForm");
  const H2 =  getByTestId("signInH2");
  const colMdDiv =  getByTestId("colmddiv");
  const formGroupDiv =  getByTestId("formGroupDiv");
  const labelTag =  getByLabelText("Username / Email");
  const usernameInput =  getByTestId("usernameInput");
  const formGroupDivTwo =  getByTestId("formGroupDivTwo");
  const passwordLabel =  getByLabelText("Password");
  const passwordInput = getByTestId("passwordInput");
  const signInButton =  getByTestId("signInButton");
   [
     H2,
     LoginFormForm,
     colMdDiv,
     labelTag,
     formGroupDiv,
     usernameInput,
     passwordInput,
     formGroupDivTwo,
     passwordLabel,
     signInButton,
   ].forEach((element)=> {
     expect(element).toBeInTheDocument();
    })
});

//check for form validation with react hook forms

it('should validate form fields', async () => {
  const mockSave = jest.fn();
  const { getByRole, getByTestId, findAllByRole } = render(<LoginForm />);
  const signInButton = getByTestId("signInButton");

  fireEvent.input(
    getByRole(
      "textbox",
      { name: /username/i },
      {
        target: {
          value: "harr",
        },
      }
    )
  );

    fireEvent.submit(signInButton, {name: /Sign In/i});
    
    expect(await findAllByRole("alert")).toHaveLength(2);
    expect(mockSave).not.toBeCalled();
})