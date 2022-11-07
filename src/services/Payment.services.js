import createHttp from './Base.services';

const authHttp = createHttp(true);
//const noAuthHttp = createHttp();

export const paymentIntent = (body) =>
    authHttp.post('/create-payment-intent/reserve', body)

export const payManyBillsIntent = (body) =>
    authHttp.post('/create-payment-intent/bills', body)
