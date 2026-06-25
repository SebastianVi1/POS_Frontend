import { useState } from 'react';
import { type AxiosResponse } from 'axios';

type ErrorType = Error | null | string;
type Data<T> = T | null;

interface Params<T, D> {
  mutateAsync: (postData: D) => Promise<T>;
  loading: boolean;
  error: ErrorType;
  data: Data<T>;
}

// ✅ Los genéricos <T, D> van aquí, inmediatamente después del nombre de la función
export function useMutation<T, D>(
  serviceFunction: (funData: D) => Promise<AxiosResponse<T>>
): Params<T, D> {

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType>(null);
  const [data, setData] = useState<Data<T>>(null);

  const mutateAsync = async (postData: D): Promise<T> => {
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

  return { mutateAsync, loading, error, data };
}
