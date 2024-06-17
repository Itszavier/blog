/** @format */
import { useState, useEffect, useCallback } from "react";
import { serverAxios } from "../api/axios";

interface Config<Data> {
  onfetch?: (data: Data) => void;
  key?: string;
  initialData?: Data | (() => Data);
}

interface UseFetchReturn<Data> {
  isPending: boolean;
  setIsPending: (isPending: boolean) => void;
  data: Data | null;
  setData: (data: Data | null) => void;
  error: any;
  setError: (error: any) => void;
}

export default function useFetch<Data>(
  url: string,
  config: Config<Data>
): UseFetchReturn<Data> {

  const { initialData, key, onfetch } = config;
  const [isPending, setIsPending] = useState<boolean>(true);

  const [data, setData] = useState<Data | null>(
    typeof initialData === "function"
      ? (initialData as () => Data)()
      : initialData || null
  );
  const [error, setError] = useState<any>();

  const fetch = useCallback(
    (fetchedData: Data) => {
      if (onfetch) {
        onfetch(fetchedData);
      }
      setData(fetchedData);
    },
    []
  );

  useEffect(() => {
    const controller = new AbortController();
    serverAxios
      .get(url, { signal: controller.signal })
      .then((res) => {
        if (key) {
          const data = res.data[key];
          fetch(data);
        } else {
          const data = res.data;
          fetch(data);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => {
        setIsPending(false);
      });

  
  }, [url, key, fetch]);

  return { isPending, setIsPending, data, setData, error, setError };
}