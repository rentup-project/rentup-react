import createHttp from './Base.services';

const authHttp = createHttp(true);
//const noAuthHttp = createHttp();

export const paymentIntent = (body) =>
    authHttp.post('/create-payment-intent', body)