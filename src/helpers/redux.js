import {combineActions, handleActions} from "redux-actions";

export const simpleReducer = (initState, actions) => handleActions({
    [combineActions(...Object.values(actions))]: (state, action) => ({...state, ...action.payload}),
}, initState);
