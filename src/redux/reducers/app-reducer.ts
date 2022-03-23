import { produce } from "immer";
import { AppReducer } from "../../types/reducer-types/app-reducer";
import { showLoader, hideLoader } from "../actions/app-actions";

const initialState: AppReducer = {
  loading: false,
};
const appReducer = produce((draft: AppReducer, action: any) => {
  switch (action.type) {
    case showLoader.toString():
      draft.loading = true;
      break;
    case hideLoader.toString():
      draft.loading = false;
      break;
  }
}, initialState);

export default appReducer;
