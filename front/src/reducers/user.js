import ACTIONS from '../static/ACTIONS';
import { userState } from './defaultStates';

const userReducer = (state = userState, action) => {
    switch (action.type) {
        case ACTIONS.AUTH_SUCCESS: {
            return {
                ...state,
                userID: action.payload.data,
            };
        }
        default: return state;
    }
};

export default userReducer;
