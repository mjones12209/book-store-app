import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import styles from "./LoginForm.module.css";

interface Inputs {
  username: string;
  password?: string;
  passwordValid: string;
}

const LoginForm = () => {
  const { dispatch } = useContext(AuthContext);

  const [error, setError] = useState();

  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {},
    resolver: undefined,
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: false,
  });

  const login: Function = async (username: string, password: string) => {
    try {
      const asyncResponse: AxiosResponse<any> = await axios({
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
        window.localStorage.setItem("refresh","1");
        history.push("/bookshelf");
      }
    } catch (e) {
      setError(e.message);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (formData: Inputs) => {
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
        <div
          id={styles["login-form-div"]}
          className="col-md-3 shadow-lg text-center p-3 mt-2 mb-5 bg-white rounded"
        >
          <h2>Sign In</h2>
          <div className="form-group">
            <label>Username / Email</label>
            <input
              type="text"
              className="form-control"
              id="username"
              {...register("username", {
                required: "This is a required field.",
                setValueAs: (val) => val.trim(),
                minLength: 5,
                maxLength: 30,
              })}
            />
            {errors.username && (
              <Alert className="mt-1" variant="danger">
                {errors.username?.type === "required" &&
                  errors.username.message}
                {errors.username?.type === "maxLength" &&
                  "Max length of username is 30 characters!"}
                {errors.username?.type === "minLength" &&
                  "Min length of username is 5 characters!"}
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
                setValueAs: (val) => val.trim(),
                minLength: 6,
                maxLength: 30,
              })}
            />
            {errors.passwordValid && (
              <Alert className="mt-1" variant="danger">
                {errors.passwordValid?.type === "required" &&
                  errors.passwordValid.message}
                {errors.passwordValid?.type === "maxLength" &&
                  "Max length of password is 30 characters!"}
                {errors.passwordValid?.type === "minLength" &&
                  "Min length of password is 6 characters!"}
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
