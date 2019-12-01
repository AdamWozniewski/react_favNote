import axios from 'axios';

export const removeItem = (itemType, id) => ({
   type: 'REMOVE_ITEM',
   payload: {
       itemType,
       id,
   }
});

const idGenerator = () => `${Math.random().toString(36).sub(2, 9)}`;
export const addItem = (itemType, itemContent) => ({
    type: 'ADD_ITEM',
    payload: {
        itemType,
        item: {
            ...itemContent
        },
    }
});
const fetchItems = (itemType, data) => ({
    type: 'FETCH_ITEMS',
    payload: {
        data,
        itemType,
    }
});
const authSuccess = payload => ({
    type: 'AUTH_SUCCESS',
    payload,
});
const authErr = payload => ({
    type: 'AUTH_ERR',
    payload,
});

export const removeItemAction = (itemType, id) => dispatch =>
    axios.delete(`http://localhost:9000/api/note/${id}`)
        .then(() => dispatch(removeItem(itemType, id)))
        .catch(err => console.log(err));
export const addItemAction = (itemType, itemContent) => (dispatch, getState) => {
    dispatch(addItem(itemType, {...itemContent, id: idGenerator()}));
    return axios
        .post(`http://localhost:9000/api/note`, {
            userID: getState().userID,
            type: itemType,
            ...itemContent,
        })
        .then(() => dispatch(addItem(itemType, itemContent)))
        .catch(err => console.log(err))
};

export const auth = (username, password) => dispatch =>
    axios
        .post('http://localhost:9000/api/user/login', {
            username,
            password
        })
        .then(data => dispatch(authSuccess(data)))
        .catch(err => dispatch(authErr(err)));

export const register = (username, password) => dispatch =>
    axios.post('http://localhost:9000/api/user/register', {
        username,
        password
    })
        .then(data => dispatch(authSuccess(data)))
        .catch(err => dispatch(authErr(err)));

export const fetchItemsAction = type => (dispatch, getState) =>
    axios.post('http://localhost:9000/api/notes', {
        params: {
            type,
            userID: getState().userID,
        }}, {})
        .then(({ data }) => dispatch(fetchItems(type, data)))
        .catch(err => err);
