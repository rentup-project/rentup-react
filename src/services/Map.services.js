import axios from 'axios';
const accessToken = process.env.REACT_APP_MAP_TOKEN


const http = axios.create({
    baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
});

export const getCoordinates = (search) => 
    http
    .get(`/${search}.json?access_token=${accessToken}`)
