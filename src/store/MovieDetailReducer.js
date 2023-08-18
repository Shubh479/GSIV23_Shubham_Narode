import * as actionType from "./ActionTypes";

export default function MovieDetailReducer(state = {}, action) {
  const { payload } = action;
  switch (action.type) {
    case actionType.GET_MOVIES_LIST_BY_ID:
      return (state = payload);
    default:
      return state;
  }
}
