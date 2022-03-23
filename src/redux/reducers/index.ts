import { combineReducers } from "redux";

import appReducer from "./app-reducer";
import authReducer from "./auth-reducer";

const reducers = combineReducers({
  app: appReducer,
  auth: authReducer,
});

export default reducers;