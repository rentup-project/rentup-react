import * as Yup from "yup";
import ERRORS from "../constants/FormErrors";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email(ERRORS.ERROR_LOGIN)
    .required(ERRORS.ERROR_LOGIN),
  password: Yup.string()
    .min(8, ERRORS.ERROR_LOGIN)
    .required(ERRORS.ERROR_LOGIN),
});
