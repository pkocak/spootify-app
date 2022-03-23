/**
 * @author Mehmet Polat KOÇAK <mehmet@komutteknolojisi.com>
 * @format
 * @flow strict-local
 */

import axios, { Method, AxiosError, AxiosResponse } from "axios";
import { call, put, select } from "redux-saga/effects";
import api from "../config";
import { logoutAction } from "../redux/actions/auth-actions"
import { getApiParams } from "../redux/selectors/auth-selectors";

export enum BodyType {
  raw,
  formdata,
}

interface ApiParams {
  url: string;
  method: Method;
  bodyType?: BodyType;
  body?: object;
}
interface ApiUnderTheHoodParams {
  token?: string;
}
export function* createRequestSaga({
  url,
  method,
  body,
  bodyType,
}: ApiParams): Generator<any, AxiosResponse<any>, any> {
  const { token } = yield select(getApiParams);

  return yield call(createRequest, {
    token,
    url,
    method,
    bodyType,
    body,
  });
}

const getFormData = (data: Object): FormData => {
  let formData = new FormData();
  Object.keys(data).forEach((key) => {
    const val = (data as any)[key];
    if (Array.isArray(val)) {
      val.forEach((v, i) => {
        if (Object.keys(v).length === 0) {
          formData.append(`${key}`, v);
        } else {
          if (typeof v === "object") {
            Object.keys(v).forEach((k) =>
              formData.append(`${key}[${i}].${k}`, v[k])
            );
          } else {
            formData.append(`${key}[${i}]`, v);
          }
        }
      });
    } else formData.append(key, val);
  });
  return formData;
};
const getRequestHeaders = (bodyType: BodyType) => {
  switch (bodyType) {
    case BodyType.formdata:
      return {
        post: { "Content-Type": "multipart/form-data" },
        put: { "Content-Type": "multipart/form-data" },
        patch: { "Content-Type": "multipart/form-data" },
        delete: { "Content-Type": "multipart/form-data" },
      };
    case BodyType.raw:
    default:
      return {
        post: { "Content-Type": "application/json-patch+json" },
        put: { "Content-Type": "application/json-patch+json" },
        patch: { "Content-Type": "application/json-patch+json" },
        delete: { "Content-Type": "application/json-patch+json" },
      };
  }
};
export const createRequest = async ({
  token,
  url,
  method,
  bodyType,
  body,
}: ApiParams & ApiUnderTheHoodParams) => {
  const response = await axios
    .request({
      // `url` is the server URL that will be used for the request
      url,
      // `method` is the request method to be used when making the request
      method, // get default
      // `baseURL` will be prepended to `url` unless `url` is absolute.
      // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
      // to methods of that instance.
      baseURL: api.baseUrl,

      // `transformRequest` allows changes to the request data before it is sent to the server
      // This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
      // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
      // FormData or Stream
      // You may modify the headers object.
      transformRequest: [
        function (data, headers) {
          // Do whatever you want to transform the data

          //console.log("transformRequest HEADER", headers);
          //console.log("transformRequest DATA", data);
          return data;
        },
      ],

      // `transformResponse` allows changes to the response data to be made before
      // it is passed to then/catch
      transformResponse: [
        function (data) {
          // Do whatever you want to transform the data
          //console.log('transformResponse', data);
          return data;
        },
      ],

      // `headers` are custom headers to be sent
      headers: {
        common: {
          "Content-Type": "application/json-patch+json",
          Authorization: `Bearer ${token || ""}`,
          "Accept-Language": "en-US",
        },
        ...getRequestHeaders(bodyType || BodyType.raw),
      },

      // `params` are the URL parameters to be sent with the request
      // Must be a plain object or a URLSearchParams object
      params: method === "GET" && body ? body : undefined,
      // `data` is the data to be sent as the request body
      // Only applicable for request methods 'PUT', 'POST', 'DELETE , and 'PATCH'
      // When no `transformRequest` is set, must be of one of the following types:
      // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
      // - Browser only: FormData, File, Blob
      // - Node only: Stream, Buffer
      data:
        method !== "GET" && body
          ? bodyType === BodyType.formdata
            ? getFormData(body)
            : JSON.stringify(body)
          : undefined,
      // `responseType` indicates the type of data that the server will respond with
      // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
      // browser only: 'blob'
      responseType: "json", // default
      // `cancelToken` specifies a cancel token that can be used to cancel the request
      // (see Cancellation section below for details)
    })
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      console.log("ERROR AXIOS", error.response);
      if (!!error.isAxiosError && !error.response) {
        console.log("NETWORK ERROR: ", error.message);
      } else if (error.response?.status === 401) {
        console.log("ERROR 401", url, error.response);
        put(logoutAction());
      }
      return error.response?.data;
    });

  return JSON.parse(response);
};
