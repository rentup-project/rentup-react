import createHttp from "./Base.services";

const authHttp = createHttp(true);
const noAuthHttp = createHttp();

export const completePrequalification = (body) => 
    authHttp.post("/my-area/prequalifications", body);

export const getPrecualification = (user) =>
    authHttp.get(`/my-area/prequalifications/${user}`);