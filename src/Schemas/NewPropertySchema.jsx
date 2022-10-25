import * as Yup from "yup";
import ERRORS from "../constants/FormErrors";

const NewPropertySchema = Yup.object().shape({
  address: Yup.string().required(ERRORS.ERROR_ADDRESS),
  addressVisibility: Yup.string()
    .required(ERRORS.ERROR_ADDRESS_VISIBILITY)
    .mixed()
    .oneOf(["Show full address", "Show street only"]),
  availabilityDate: Yup.date().required(ERRORS.ERROR_AVAILABLE_DATE),
  propertyType: Yup.string()
    .required(ERRORS.ERROR_PROPERTY_TYPE)
    .mixed()
    .oneOf(["House", "Apartment"]),
  houseType: Yup.string()
    .required(ERRORS.ERROR_HOUSE_TYPE)
    .mixed()
    .oneOf(["Detached house", "Single family house", "Semi-detached house"]),
  apartmentType: Yup.string()
    .required(ERRORS.ERROR_APARTMENT_TYPE)
    .mixed()
    .oneOf(["Apartment", "Penthouse", "Duplex", "Studio", "Loft"]),
  squaredMeters: Yup.number().required(ERRORS.ERROR_SQUARED_METERS),
  bedroom: Yup.number().required(ERRORS.ERROR_BEDROOM),
  bathroom: Yup.number().required(ERRORS.ERROR_BATHROOM),
  orientation: Yup.string()
    .required(ERRORS.ERROR_ORIENTATION)
    .mixed()
    .oneOf(["Exterior", "Interior"]),
  furniture: Yup.string()
    .mixed()
    .oneOf(["Not furnished", "Only kitchen furnished", "Fully furnished"]),
  floor: Yup.string()
    .required(ERRORS.ERROR_FLOOR)
    .mixed()
    .oneOf(["First", "In between", "Last"]),
  features: Yup.array()
    .of(Yup.string())
    .mixed()
    .oneOf([
      "Pool",
      "Air conditioning",
      "Lyft",
      "Built-in cabinets",
      "Boxroom",
      "Parking",
      "Balcony",
      "Terrace",
      "Garden",
      "24-hour-security",
      "Gym",
      "Playground",
      "Spa",
      "Patio",
    ]),
  requiredJobDuration: Yup.string().oneOf([
    "More than 3 months",
    "One year",
    "More than a year",
  ]),
  requiredAnnualSalary: Yup.number().required(ERRORS.ERROR_ANNUAL_SALARY),
  petAllowed: Yup.boolean(),
  heating: Yup.string().oneOf([
    "Individual-electric",
    "Central",
    "Individual-gas",
  ]),
  images: Yup.array().required(ERRORS.ERROR_IMAGES).length(5),
  monthlyRent: Yup.number().required(ERRORS.ERROR_MONTHLY_RENT),
  bailDeposit: Yup.number(),
  reservationPrice: Yup.number().required(ERRORS.ERROR_RESERVATION_PRICE),
  requireGuarantee: Yup.string()
    .oneOf(["None", "1 month", "2 months"]),
  reserved: Yup.boolean()
});

export default NewPropertySchema;
