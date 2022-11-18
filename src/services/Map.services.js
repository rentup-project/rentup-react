import axios from 'axios';
const accessToken = "pk.eyJ1IjoibmluYWxib25pIiwiYSI6ImNsOWNuYXppYjBrNmYzcG9laHA3MTN3bTQifQ.90TcbIeqC9bJYExbkEto4Q";


const http = axios.create({
    baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
});

export const getCoordinates = (search) => 
    http
    .get(`/${search}.json?access_token=${accessToken}`)
