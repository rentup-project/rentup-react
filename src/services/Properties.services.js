import createHttp from "./Base.services";

const http = createHttp();

export const getOneProperty = (id) => 
    http
    .get(`/property/${id}`);

export const getAllProperties = (city, queries) =>
    http
    .get(`/properties/${city}`);
