import axios from "axios";
import { useState, useEffect } from "react";

type Data<T> = T | null;
type ErrorType = Error | null;

interface Params {
  data: Data<T>;
  loading: boolean;
  error: ErrorType;
}

function useFetch<T>(url: string): Params {
  const [error, setError] = useState<ErrorType>(null);
  const [data, setData] = useState<Data<T>>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const controller = new AbortController();

    setLoading(true); // start loading

    async function fetchData() {
      try {
        const response = await axios.get(url, controller);

        if (response.status != 200) {
          throw new Error("Fetch failed");
        }
        const jsonData: T = await response.data; //parsed to jsonData

        setData(jsonData);
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
  }, [url]);

  return { data, loading, error };
}
