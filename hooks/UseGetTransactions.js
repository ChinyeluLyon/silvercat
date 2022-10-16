import useAxios from "axios-hooks";

const url = "/transactions";

const useGetTransactions = (userId) => {
  const queryConfig = {
    method: "get",
    url: `${url}/${userId}`,
  };
  const [{ data, loading, error }, refetch] = useAxios(queryConfig, {
    useCache: false,
  });

  return { data, loading, error, refetch };
};

export default useGetTransactions;
