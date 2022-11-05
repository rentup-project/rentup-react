import createHttp from "./Base.services";

const authHttp = createHttp(true);
//const noAuthHttp = createHttp();

export const getPrequalification = (tenant) =>
    authHttp.get(`/my-area/prequalification/${tenant}`);

export const completePrequalification = (body) => 
    authHttp.post("/my-area/prequalification/complete", body);

export const editPrequalification = (user, body) =>
    authHttp.post(`/my-area/prequalification/edit/${user}`, body);

export const editUserData = (user, body) =>
  authHttp.post(`/my-area/account/edit/${user}`, body);