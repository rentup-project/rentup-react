import http from './Base.services';

export const signup = (body) => 
    http
    .post('/signup', body)
    .then((res) => res)