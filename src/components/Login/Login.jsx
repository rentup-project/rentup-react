import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import arrowIcon from "../../assets/images/arrow.png";
import googleIcon from "../../assets/images/google-icon.png";
import ERRORS from "../../constants/FormErrors";
import AuthContext from "../../contexts/AuthContext";
import { login as userLogin } from "../../services/Auth.services";
import Input from "../Input/Input";
import * as Yup from "yup";
import "./Login.css";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email(ERRORS.ERROR_LOGIN)
    .required(ERRORS.ERROR_LOGIN),
  password: Yup.string()
    .min(8, ERRORS.ERROR_LOGIN)
    .required(ERRORS.ERROR_LOGIN),
});

export default function Login({ handleChangeRegister, message }) {
  const [mongoErr, setMongoErr] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const INITIAL_VALUES = {
    email: "",
    password: "",
  };

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: onSubmit,
    validationSchema: loginSchema,
    validateOnChange: false,
  });

  function onSubmit(values) {
    userLogin(values)
      .then(({ accessToken }) => {
        login(accessToken);
        navigate("/");
        setSubmitting(false);
      })
      .catch((err) => {
        err?.response?.data &&
          Object.keys(err.response.data).forEach((errorKey) => {
            setMongoErr(err.response.data[errorKey]);
          });
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  const handleOnClick = () => {
    window.location.assign("http://localhost:3001/api/login/google");
  };

  return (
    <div className="Login">
      <h2>Login</h2>
      {message === "Message sent" ? (
        <p className="email-message">
          Please check your email before trying to login.
        </p>
      ) : (
        <></>
      )}
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Email"
          type="email"
          name="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email || mongoErr}
        />
        <Input
          placeholder="Password"
          type="password"
          name="password"
          id="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password || mongoErr}
        />
        <div>
          <button
            type="submit"
            className="login-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading" : "LOGIN"}
          </button>

          <p className="or-line">
            <span>OR</span>
          </p>

          <div className="google-button" onClick={handleOnClick}>
            <div className="flex-div">
              <img className="google-icon" src={googleIcon} alt="google icon" />
              <p>Login with Google</p>
            </div>
            <img className="arrow-icon" src={arrowIcon} alt="arrow icon" />
          </div>

          <p className="login-link" onClick={handleChangeRegister}>
            Don't have an account? <span>Register here!</span>
          </p>
        </div>
      </form>
    </div>
  );
}
