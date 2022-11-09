import createHttp from "./Base.services";

const http = createHttp();
//const noAuthHttp = createHttp();

export const getOneProperty = (id) => 
  http.get(`/property/${id}`);

export const getAllProperties = (city, filterData) =>
  http.get(`/properties/${city}`, {
    params: filterData
  });

export const createProperty = (body) =>
  http.post(`/properties/create`, body);

export const updateProperty = (id, body) =>
  http.post(`/properties/edit/${id}`, body);

export const getOwnerProperties = (user) =>
  http.get(`/properties/created/${user}`);

export const getOwnerRents = (user) => 
  http.get(`/properties/reserved/${user}`);

export const deleteProperty = (id) => 
  http.delete(`/properties/delete/${id}`);

export const reserveProperty = (body) => 
  http.post(`/reserve`, body);

export const cancelReservation = (id, user) =>
  http.get(`/reserve/cancel/${id}`);

export const createRent = (body) =>
  http.post('/rent/create', body)

export const getOneRent = (id) =>
  http.get(`/rent/${id}`)

export const getReviews = (id) => 
  http.get(`/property/reviews/${id}`);

export const getLastProperties = () => 
  http.get(`/properties/last`);
