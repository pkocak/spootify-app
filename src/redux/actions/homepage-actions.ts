/**
 * @author Mehmet Polat KOÇAK <mehmetpolatkocak@gmail.com>
 * @format
 * @flow strict-local
 */

import { createAction } from "redux-smart-actions";
import urls from "../../service/urls";

import { ApiCallback } from "../../types/service-types";
import { NewReleases } from "../../types/objects/new-releases";
import { CategoriesObject } from "../../types/objects/categories";
import { FeaturedPlaylists } from "../../types/objects/featured-playlists";

/**
 * GETTERS
 */

export const getCategories = createAction("GET_CATEGORIES", (payload: ApiCallback<CategoriesObject>) => ({
  payload, url: urls.categories
}));

export const getFeaturedPlaylists = createAction("GET_FEATURED_PLAYLISTS", (payload: ApiCallback<FeaturedPlaylists>) => ({
  payload, url: urls.featuredPlaylists
}));

export const getNewReleases = createAction("GET_NEW_RELEASES", (payload: ApiCallback<NewReleases>) => ({
  payload, url: urls.newReleases
}));