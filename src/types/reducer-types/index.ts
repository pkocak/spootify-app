import { AppReducer } from "./app-reducer";
import { AuthReducer } from "./auth-reducer";

export interface RootReducer {
  app: AppReducer;
  auth: AuthReducer;
}