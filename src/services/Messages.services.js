import createHttp from "./Base.services";

const authHttp = createHttp(true);
//const noAuthHttp = createHttp();

export const getMessages = (currentUser, owner) => 
    authHttp.get(`/messages/${currentUser}/${owner}`);

export const createMessage = (body) => 
    authHttp.post(`/messages/create`, body);

export const selectUser = (currentUserId) => 
    authHttp.get(`/messages/select/${currentUserId}`);