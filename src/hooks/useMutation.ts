import { useState } from 'react';
import { type AxiosResponse } from 'axios';

type ErrorType = Error | null | string;
type Data<T> = T | null;

interface Params<T, D> {
  mutantAsync: (postData: D) => Promise<T>;
  loading: boolean;
  error: ErrorType;
  data: Data<T>;
}

export function useMutation<T, D>(
  serviceFunction: (funData: D) => Promise<AxiosResponse<T>>
): Params<T, D> {

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType>(null);
  const [data, setData] = useState<Data<T>>(null);


  //petition 
  const mutantAsync = async (postData: D): Promise<T> => {
    try {
      setLoading(true);
      setError(null);

      const response = await serviceFunction(postData);
      setData(response.data);
      return response.data;

    } catch (err: any) {
      let errorMessage = "An error has occurred";

      if (err.response) {
        errorMessage = err.response.data?.message || `Server error: ${err.response.status}`;
      } else if (err.request) {
        errorMessage = "The server is not responding, check your connection";
      }

      setError(errorMessage);
      throw err;

    } finally {
      setLoading(false);
    }
  };

  return { mutantAsync, loading, error, data };
}
