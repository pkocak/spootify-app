import { call, put, takeLatest } from "@redux-saga/core/effects";
import { createRequestSaga } from "../../service";
import { ApiCallback, SagaGenericParams } from "../../types/service-types";
import { hideLoader, showLoader } from "../actions/app-actions";
import * as A from "../actions/homepage-actions";

import { CategoriesObject } from "../../types/objects/categories";
import { FeaturedPlaylists } from "../../types/objects/featured-playlists";
import { NewReleases } from "../../types/objects/new-releases";
import methods from "../../service/methods";

function* getListSaga<Type>({
  payload,
  url,
}: SagaGenericParams<ApiCallback<Type>>) {
  yield put(showLoader());
  try {
    const response: Type = yield call(createRequestSaga, {
      method: methods.get,
      url: url || "",
    });
    response ? payload.onSuccess(response) : payload.onError('error retriving data')
  } catch (e) {
    console.log("ERROR getListSaga", e);
  } finally {
    yield put(hideLoader());
  }
}

const genericSaga = [
  takeLatest(A.getCategories.toString(), (params: SagaGenericParams<ApiCallback<CategoriesObject>>) =>
    getListSaga<CategoriesObject>(params)
  ),
  takeLatest(A.getFeaturedPlaylists.toString(), (params: SagaGenericParams<ApiCallback<FeaturedPlaylists>>) =>
    getListSaga<FeaturedPlaylists>(params)
  ),
  takeLatest(A.getNewReleases.toString(), (params: SagaGenericParams<ApiCallback<NewReleases>>) =>
    getListSaga<NewReleases>(params)
  ),
];

export default genericSaga;
