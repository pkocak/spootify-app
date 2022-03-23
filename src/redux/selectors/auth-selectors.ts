import { createSelector } from "reselect";
import { RootReducer } from "../../types/reducer-types";


const tokenState = (state: RootReducer) => state.auth.token;
export const tokenSelector = createSelector([tokenState], (token) => token);

const loggedState = (state: RootReducer) => state.auth.token;
export const loggedSelector = createSelector([loggedState], (token) =>
  token ? true : false
);

export const getApiParams = createSelector([tokenState], (token) => token || "");