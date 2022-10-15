import { useFormik } from "formik";
import { useContext } from "react";
import Input from "../Input/Input";
import AuthContext from "../../contexts/AuthContext";
import { login as userLogin, loginGoogle } from "../../services/Auth.services";
import LoginSchema from "../../schemas/LoginSchema";
import { useNavigate } from "react-router-dom";
import './Login.css'
import googleIcon from '../../assets/images/google-icon.png'
import arrowIcon from '../../assets/images/arrow.png'

export default function Login({ handleChangeRegister }) {
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
    setFieldError,
  } = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: onSubmit,
    validationSchema: LoginSchema,
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
        err.response.data &&
          Object.keys(err.response.data.errors).forEach((errorKey) => {
            setFieldError(errorKey, err.response.data.errors[errorKey]);
          });
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  const handleOnClick = () => {
    loginGoogle()
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  return (
    <div className="Login">
      <h2>Login to your account</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          placeholder="johnsnow@gmail.com"
          type="email"
          name="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          label="Password"
          placeholder="Password"
          type="password"
          name="password"
          id="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
        <div>
          <button
            type="submit"
            className="login-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading" : "LOGIN"}
          </button>

          <p className="or-line"><span>OR</span></p>

          <div className="google-button" onClick={handleOnClick}>
            <div className="flex-div">
              <img className='google-icon' src={googleIcon} alt="google icon" />
              <p>
                Login with Google
              </p>
            </div>
            <img className='arrow-icon' src={arrowIcon} alt="arrow icon" />
          </div>

          <p className="login-link" onClick={handleChangeRegister}>Don't have an account? <strong>Register here!</strong></p>
        </div>
      </form>
    </div>
  );
}