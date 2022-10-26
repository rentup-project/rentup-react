import createHttp from "./Base.services";

const authHttp = createHttp(true);
const noAuthHttp = createHttp();

export const getMessages = (currentUser, owner) => 
authHttp.get(`/messages/${currentUser}/${owner}`);