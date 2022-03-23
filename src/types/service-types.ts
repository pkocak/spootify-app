export interface SagaGenericParams<Type> {
  type: string;
  payload: Type;
  url?: string;
}

export interface ApiCallback<PayloadType = never>
  extends ApiSuccess<PayloadType>,
  ApiError { }

export interface ApiSuccess<PayloadType = never> {
  onSuccess: (payload?: PayloadType) => void;
}

export interface ApiError {
  onError: (message: string) => void;
}
