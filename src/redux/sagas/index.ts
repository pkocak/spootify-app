import { all } from "redux-saga/effects";

import genericSaga from "./generic-saga";

export function* rootSaga() {
  yield all([...genericSaga]);
}
