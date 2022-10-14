import createHttp from './Base.services';

const authHttp = createHttp(true);
const noAuthHttp = createHttp();

export const register = (body) => 
    noAuthHttp
    .post('/register', body)

export const login = (body) =>
    noAuthHttp
    .post("/login", body)

export const getCurrentUser = () => 
    authHttp
    .get("/users/me");

export const activateAccount = (token) => 
    noAuthHttp
    .get(`/activate/${token}`);