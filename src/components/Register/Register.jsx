import { useFormik } from "formik";
import React, { useState } from "react";
import { register } from "../../services/Auth.services";
import Input from "../Input/Input";
import './Register.css';
import arrowIcon from '../../assets/images/arrow.png';
import googleIcon from '../../assets/images/google-icon.png';
import * as Yup from "yup";
import ERRORS from "../../constants/FormErrors";

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .required(ERRORS.ERROR_REQUIRED),
  email: Yup.string()
    .email(ERRORS.ERROR_VALID_EMAIL)
    .required(ERRORS.ERROR_REQUIRED),
  password: Yup.string()
    .min(8, ERRORS.ERROR_PASSWORD_LENGTH)
    .required(ERRORS.ERROR_REQUIRED),
});

const INITIAL_VALUES = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  annualSalary: "select",
  jobDuration: "select",
};

export default function Register({ handleChangeLogin }) {
  const [mongoErr, setMongoErr] = useState(false)

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
    validationSchema: registerSchema,
    validateOnChange: false,
  });

  function onSubmit(values) {
    register(values)
      .then((user) => {
        const emailMessage = 'Message sent'
        handleChangeLogin(emailMessage)
      })
      .catch((err) => {
        err?.response?.data &&
          Object.keys(err.response.data).forEach((errorKey) => {
            setMongoErr(err.response.data[errorKey])
          });
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  const handleOnClick = () => {
    window.location.assign(`http://localhost:3001/api/login/google`);
  }

  return (
    <div className="Register">
      <h2>Join us</h2>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Full name"
          name="name"
          id="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
        />
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
          error={errors.password}
        />
        <div>
          <button
            type="submit"
            className="register-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading" : "REGISTER"}
          </button>

          <p className="or-line"><span>OR</span></p>

          <div className="google-button" onClick={handleOnClick}>
            <div className="flex-div">
              <img className='google-icon' src={googleIcon} alt="google icon" />
              <p>
                Register with Google
              </p>
            </div>
            <img className='arrow-icon' src={arrowIcon} alt="arrow icon" />
          </div>
          <p className="register-link" onClick={handleChangeLogin}>Already have an account? <span>Login here!</span></p>
        </div>
      </form>
    </div>
  );
}