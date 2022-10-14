import { useFormik } from "formik";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import Input from "../components/Input/Input";
import AuthContext from "../contexts/AuthContext";
import { login as userLogin } from "../services/Auth.services";
import LoginSchema from "../Schemas/LoginSchema";
import { useNavigate } from "react-router-dom";

export default function Login() {  

  const { state } = useLocation();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const INITIAL_VALUES = {
    email: (state && state.email) || "",
    password: "",
  };

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    isSubmitting,
    setSubmitting,
    setFieldError
  } = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: onSubmit,
    validationSchema: LoginSchema,
    validateOnBlur: false,
    validateOnChange: false,
  });

  function onSubmit(values) {
    console.log('user values', values)
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

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading" : "Login"}
        </button>
      </form>
    </div>
  );
}
