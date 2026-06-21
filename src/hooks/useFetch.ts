import { type AxiosResponse } from "axios";
import { useState, useEffect } from "react";

type Data<T> = T | null;
type ErrorType = Error | null;

interface Params {
  data: Data<T>;
  loading: boolean;
  error: ErrorType;
}

// the hook uses service functions as fetch, that way the petition can be different
// this hook only returns the data, and state of the object and petition
function useFetch<T>(
  serviceFunction: (signal: AbortSignal) => Promise<AxiosResponse<T>>,
): Params {
  const [error, setError] = useState<ErrorType>(null);
  const [data, setData] = useState<Data<T>>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true); // start loading

    async function fetchData() {
      try {
        const response = await serviceFunction(controller.signal);
        if (response.status != 200) {
          throw new Error("Something went wrong");
        }

        setData(response.data);
        setError(null);
      } catch (err: any) {
        setError(err as Error);
        console.log("An error has ocurred:" + { err });
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [serviceFunction]);

  return { data, loading, error };
}
export default useFetch;
