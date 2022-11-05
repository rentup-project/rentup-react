import createHttp from "./Base.services";

const authHttp = createHttp(true);
//const noAuthHttp = createHttp();

export const getOneUser = (id) => 
    authHttp.get(`/users/${id}`);
