import createHttp from "./Base.services";

const authHttp = createHttp(true);
//const noAuthHttp = createHttp();

export const createBill = (body) => 
    authHttp.post("/bills/create", body);

export const getAllBills = (id) => 
    authHttp.get(`/bills/${id}`);

export const deleteBill = (id) => 
    authHttp.delete(`/bills/delete/${id}`);

export const deleteManyBills = (arr) => 
    authHttp.delete(`/bills/delete`, {data: arr});

export const updateBills = (arr) => 
    authHttp.post(`/bills/update`, {arr});
