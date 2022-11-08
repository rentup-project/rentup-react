import createHttp from "./Base.services";

const authHttp = createHttp(true);
//const noAuthHttp = createHttp();

export const getAllFavs = (user) => 
    authHttp
    .get(`/account/favs/${user}`);

export const getOneFav = (user, property) => 
    authHttp
    .get(`/account/fav/${property}/${user}`);

export const updateFav = (body) => 
    authHttp
    .post(`/account/favs`, body);

export const getNotifications = (user) => 
    authHttp
    .get(`/account/notifications/${user}`);

export const deleteOneFav = (property, user) => 
    authHttp.delete(`/account/fav/delete/${property}/${user}`)
