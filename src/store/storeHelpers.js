import store from "./Store";

export const dispatcher = (type, payload) => {
  store.dispatch({ type: type, payload: payload });
};
