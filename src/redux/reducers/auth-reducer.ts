import produce from "immer";
import { AuthReducer } from "../../types/reducer-types/auth-reducer";
import { loginAction, logoutAction } from "../actions/auth-actions";

export const initialState: AuthReducer = {
  token: undefined,
};

const authReducer = produce((draft: AuthReducer, action: any) => {
  switch (action.type) {
    case loginAction.toString():
      draft.token = action.payload;
      break;
    case logoutAction.toString():
      draft.token = initialState.token;
      break;
  }
}, initialState);

export default authReducer;
