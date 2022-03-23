import { createSelector } from "reselect";
import { RootReducer } from "../../types/reducer-types";

const loadingState = (state: RootReducer) => state.app.loading;
export const isLoading = createSelector([loadingState], (loading) => loading);
