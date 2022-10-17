import createHttp from "./Base.services";

const http = createHttp();

export const getOneProperty = (id) => 
    http
    .get(`/property/${id}`);

export const getAllProperties = (city) => 
    http
    .get(`/properties/${city}`);
