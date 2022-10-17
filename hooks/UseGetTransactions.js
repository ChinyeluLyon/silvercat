import useAxios from "axios-hooks";

const url = "/transactions";

const useGetTransactions = (userId) => {
  const queryConfig = {
    method: "GET",
    url: `${url}/${userId}`,
  };
  const [{ data, loading, error }, refetch] = useAxios(queryConfig, {
    autoCancel: false,
    useCache: false,
  });

  return { data, loading, error, refetch };
};

export default useGetTransactions;
