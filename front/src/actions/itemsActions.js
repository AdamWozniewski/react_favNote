import instance from '../axios/axios';
import { removeItem, addItem, fetchItems } from './dispatchers/itemsDispatchers';
import { routes } from '../routes';

const { notes, apiNote } = routes;

// const idGenerator = () => `${Math.random().toString(36).sub(2, 9)}`;
export const matchDetailCardByParam = (match, id) => instance.get(`http://localhost:9000/api${match.path}/${id}`);

export const removeItemAction = (itemType, id) => dispatch =>
    instance
        .delete(`${apiNote}/${id}`)
        .then(() => dispatch(removeItem(itemType, id)))
        .catch(err => console.log(err));

export const addItemAction = (type, itemContent) => (dispatch, getState) =>
    instance
        .post(apiNote, {
            userID: getState().userID,
            type,
            ...itemContent,
        })
        .then(() => dispatch(addItem(type, itemContent)))
        .catch(err => console.log(err));


export const fetchItemsAction = type => (dispatch, getState) =>
    instance
        .post(notes, {
            params: {
                type,
                userID: getState().userID,
            }}, {})
        .then(({ data }) => dispatch(fetchItems(type, data)))
        .catch(err => err);
