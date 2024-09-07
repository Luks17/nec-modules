type Response<T> = {
  success: boolean;
  data: T;
};

export type SimpleReturn = {
  message: string;
};

export default Response;
