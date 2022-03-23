import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
import { rootSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["app", "locale"],
};

const middlewares = [sagaMiddleware];

const persistedReducer = persistReducer(persistConfig, rootReducer);
const redux = () => {
  let store = createStore(persistedReducer, applyMiddleware(...middlewares));
  let persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return { store, persistor };
};

export default redux;
