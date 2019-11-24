import ACTIONS from '../static/ACTIONS';

const initialState = {
    twitters: [],
    notes: [],
    articles: [],
    // userID: {},
};
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.REMOVE_ITEM: {
            return {
                ...state,
                [action.payload.itemType]:
                    [...state[action.payload.itemType]
                        .filter(({ id }) => id !== action.payload.id)],
            };
        }
        case ACTIONS.ADD_ITEM: {
            return {
                ...state,
                [action.payload.itemType]: [...state[action.payload.itemType], action.payload.item],
            };
        }
        case ACTIONS.AUTH_SUCCESS: {
            return {
                ...state,
                userID: action.payload.data,
            };
        }
        case ACTIONS.FETCH_ITEMS: {
            return {
                ...state,
                [action.payload.itemType]: [...action.payload.data],
            };
        }
        default: return state;
    }
};

export default rootReducer;
