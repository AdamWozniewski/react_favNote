import ACTIONS from '../../static/ACTIONS';

const {
    REMOVE_ITEM,
    FILTERED_ITEMS,
    ADD_ITEM,
    FETCH_ITEMS
} = ACTIONS;

export const removeItem = (itemType, id) => ({
    type: REMOVE_ITEM,
    payload: {
        itemType,
        id,
    }
});

export const filteredItems = (itemType, itemContent) => ({
    type: FILTERED_ITEMS,
    payload: {
        itemType,
        itemContent,
    }
});

export const addItem = (itemType, itemContent) => ({
    type: ADD_ITEM,
    payload: {
        itemType,
        item: { ...itemContent },
    }
});

export const fetchItems = (itemType, data) => ({
    type: FETCH_ITEMS,
    payload: {
        data,
        itemType,
    }
});
