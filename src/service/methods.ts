import { Method } from "axios";

type MethodTypes = {
  get: Method,
  post: Method,
  put: Method,
  delete: Method
}

const methods: MethodTypes = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE',
}

export default methods