/**
 * @author Mehmet Polat KOÇAK <mehmetpolatkocak@gmail.com>
 * @format
 * @flow strict-local
 */

import { createAction } from "redux-smart-actions";
import { AuthReducer } from "../../types/reducer-types/auth-reducer";

export const loginAction = createAction(
  "LOGIN_ACTION",
  (payload: AuthReducer) => ({
    payload,
  })
);

export const logoutAction = createAction("LOGOUT_ACTION");
