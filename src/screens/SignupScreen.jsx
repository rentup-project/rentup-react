import React from 'react';
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Input from '../components/Input/Input';
import SignupSchema from './../Schemas/SignupSchema';
import { signup } from './../services/Auth.services';

const INITIAL_VALUES = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  annualSalary: "select",
  jobDuration: "select"
};

export default function SignupScreen() {
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
      validationSchema: SignupSchema,
      validateOnChange: false,
    });

    const navigate = useNavigate();

    function onSubmit(values) {
        signup(values)
        .then((user) => {
          navigate("/login", {
            state: {
              email: values.email,
            }
          });
        })
        .catch((err) => {
        console.log(err)
          err.response.data &&
            Object.keys(err.response.data.errors).forEach((errorKey) => {
              setFieldError(errorKey, err.response.data.errors[errorKey]);
            });
        })
        .finally(() => {
          setSubmitting(false);
        });
    }

    // const doLoginGoogle = () => {
    //   window.open('http://localhost:3001/auth/google/callback', '_self')
    // }

    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            placeholder="Name"
            name="name"
            id="name"
            value={values.name}
            onChange={handleChange}
            error={errors.name}
          />
          <Input
            label="Email"
            placeholder="Ex: charles@gmail.com"
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
          <Input
            label="Phone number"
            placeholder="Phone number"
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
            error={errors.phoneNumber}
          />

          <div className="mb-3">
            <label htmlFor="annualSalary" className="form-label">
              Annual salary
            </label>
            <select
              name="annualSalary"
              id="annualSalary"
              onChange={handleChange}
              error={errors.annualSalary}
              value={values.annualSalary}
            >
              <option defaultValue="select">Select</option>
              <option value="<20K">{"<20K"}</option>
              <option value="<30K">{"<30K"}</option>
              <option value="<40K">{"<40K"}</option>
              <option value="<50K">{"<50K"}</option>
              <option value="<60K">{"<60K"}</option>
              <option value="<70K">{"<70K"}</option>
              <option value=">70K">{"More than 70K"}</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="jobDuration" className="form-label">
              Job duration
            </label>
            <select
              name="jobDuration"
              id="jobDuration"
              onChange={handleChange}
              error={errors.jobDuration}
              value={values.jobDuration}
            >
              <option defaultValue="select">Select</option>
              <option value="less than 3 months">{"Less than 3 months"}</option>
              <option value="less then a year">{"Less then a year"}</option>
              <option value="more than a year">{"More than a year"}</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading" : "Signup"}
          </button>
          {/* <Link onClick={doLoginGoogle} className="btn btn-danger">
              <i className="fa fa-google"></i>
              Login with Google
          </Link> */}
        </form>
      </div>
    );
}
