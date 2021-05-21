import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";
import axios from "axios";

const LoginForm = () => {
  const { dispatch } = useContext(AuthContext);

  const [error, setError] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {},
    resolver: undefined,
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: false,
  });

  const login = async (username, password) => {
    try {
      const asyncResponse = await axios({
        method: "POST",
        url: "/api/signin",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (asyncResponse.status === 200 && asyncResponse.data.token) {
        dispatch({
          type: "LOGIN",
          payload: asyncResponse.data,
        });
        window.localStorage.setItem("userInfo", asyncResponse.data);
        console.log(asyncResponse)
      }
    } catch (e) {
      console.log(e);
      setError(
        "Sorry there was a problem with your login request, please contact customer support"
      );
      if (e.response) {
        console.log(error);
      }
    }
  };

  const onSubmit = (formData) => {
    login(formData.username, formData.passwordValid);
  };

  return (
    <>
      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="col-md-3 shadow-lg text-center p-3 mt-2 ml-auto mr-auto mb-5 bg-white rounded">
            <h2>Sign In</h2>
            <div className="form-group">
              <label>Username / Email</label>
              <input
                type="text"
                className="form-control"
                id="username"
                {...register("username", {
                  required: "This is a required field.",
                  maxlength: 30,
                })}
              />
              {errors.username && (
                <Alert className="mt-1" variant="danger">
                  {errors.username?.type === "required" &&
                    errors.username.message}
                  {errors.username?.type === "maxlength" &&
                    "Max length of title is 30 characters!"}
                </Alert>
              )}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                {...register("passwordValid", {
                  required: "This is a required field.",
                  maxlength: 30,
                })}
              />
              {errors.passwordValid && (
                <Alert className="mt-1" variant="danger">
                  {errors.passwordValid?.type === "required" &&
                    errors.passwordValid.message}
                  {errors.passwordValid?.type === "maxlength" &&
                    "Max length of title is 30 characters!"}
                </Alert>
              )}
            </div>
            <button className="btn btn-primary mt-2" type="submit">
              Sign In
            </button>
          </div>
        </form>
    </>
  );
};

export default LoginForm;
