import ACTIONS from '../../static/ACTIONS';

const { AUTH_SUCCESS, AUTH_ERR } = ACTIONS;

export const authSuccess = payload => ({
    type: AUTH_SUCCESS,
    payload,
});

export const authErr = payload => ({
    type: AUTH_ERR,
    payload,
});
