import instance from '../axios/axios';
import { authErr, authSuccess } from './dispatchers/userDispatchers';
import { routes } from '../routes';

const { apiUser, login, registration } = routes;

export const auth = (username, password) => dispatch =>
    instance
        .post(`${apiUser}${login}`, {
            username,
            password
        })
        .then(data => dispatch(authSuccess(data)))
        .catch(err => dispatch(authErr(err)));

export const register = (username, password) => dispatch =>
    instance
        .post(`${apiUser}${registration}`, {
            username,
            password
        })
        .then(data => dispatch(authSuccess(data)))
        .catch(err => dispatch(authErr(err)));
