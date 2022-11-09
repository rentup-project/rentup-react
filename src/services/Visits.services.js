import createHttp from "./Base.services";

const authHttp = createHttp(true);
//const noAuthHttp = createHttp();

export const fetchVisits = (id) => 
    authHttp.get(`visits/${id}`);