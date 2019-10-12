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
            id: idGenerator(),
            ...itemContent
        },
    }
});