import createHttp from "./Base.services";

const authHttp = createHttp(true);
//const noAuthHttp = createHttp();

export const createBill = (body) => 
    authHttp.post("/bills/create", body);

export const getAllBills = (id) => 
    authHttp.get(`/bills/${id}`);