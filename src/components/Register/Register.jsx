import React from "react";
import { useFormik } from "formik";
import Input from "../Input/Input";
import RegisterSchema from "../../schemas/RegisterSchema";
import { register } from "../../services/Auth.services";
import './Register.css'
import { loginGoogle } from './../../services/Auth.services';
import googleIcon from '../../assets/images/google-icon.png'
import arrowIcon from '../../assets/images/arrow.png'

const INITIAL_VALUES = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  annualSalary: "select",
  jobDuration: "select",
};

export default function Register({ handleChangeLogin }) {
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
    validationSchema: RegisterSchema,
    validateOnChange: false,
  });

  function onSubmit(values) {
    register(values)
      .then((user) => {
        handleChangeLogin()
      })
      .catch((err) => {
        err?.response?.data &&
          Object.keys(err.response.data).forEach((errorKey) => {
            setFieldError(errorKey, err.response.data.message[errorKey]);
            console.log(err.response.data.message)
          });
          //VER COMO HACER PARA APARECER EL ERROR
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
    <div className="Register">
      <h2>Join us</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          placeholder="Name"
          name="name"
          id="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name || errors.message}
        />
        <Input
          label="Email"
          placeholder="madonna@gmail.com"
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
          <p className="register-link" onClick={handleChangeLogin}>Already have an account? <strong>Login here!</strong></p>
        </div>
      </form>
    </div>
  );
}