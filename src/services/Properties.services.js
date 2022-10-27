import createHttp from "./Base.services";

const http = createHttp();

export const getOneProperty = (id) => 
  http.get(`/property/${id}`);

export const getAllProperties = (city, filterData) =>
  http.get(`/properties/${city}`, {
    params: filterData
  });

export const createProperty = (body) =>
  http.post(`/properties/create`, body);