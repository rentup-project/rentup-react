import createHttp from "./Base.services";

const authHttp = createHttp(true);
//const noAuthHttp = createHttp();

export const fetchAvailableVisits = (id) => 
    authHttp.get(`visits/${id}`);

export const reserveVisit = (visitId, currentUserId, propertyId) => 
    authHttp.get(`visits/${visitId}/${currentUserId}/${propertyId}`);

export const getUserVisits = (id) => 
    authHttp.get(`visits/user/${id}`);

export const deleteVisit = (id) => 
    authHttp.delete(`visits/${id}`);