import createHttp from "./Base.services";

const http = createHttp();

export const getOneProperty = (id) => 
  http.get(`/property/${id}`);

export const getAllProperties = (city, filterData, skipNumber) =>
  http.get(`/properties/${city}/${skipNumber}`, {
    params: filterData
  });

export const createProperty = (data) =>
  http.post(`/properties/create`, { data });