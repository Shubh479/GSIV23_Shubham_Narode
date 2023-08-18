import * as actionType from "./ActionTypes";

export default function movieReducer(state = {}, action) {
  const { payload } = action;
  switch (action.type) {
    case actionType.GET_MOVIES_LIST:
      return (state = payload);
    default:
      return state;
  }
}
