import ACTIONS from '../static/ACTIONS';
import { itemsState } from './defaultStates';

const itemsReducer = (state = itemsState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ACTIONS.REMOVE_ITEM: {
            return {
                ...state,
                [payload.itemType]:
                    [...state[payload.itemType]
                        .filter(({ id }) => id !== payload.id)],
            };
        }
        case ACTIONS.ADD_ITEM: {
            return {
                ...state,
                [payload.itemType]: [...state[payload.itemType], action.payload.item],
            };
        }
        case ACTIONS.FETCH_ITEMS: {
            return {
                ...state,
                [payload.itemType]: [...payload.data],
            };
        }
        case ACTIONS.FILTERED_ITEMS: {
            return {
                ...state,
                filtered: payload.itemContent,
            };
        }

        default: return state;
    }
};

export default itemsReducer;
