import useAxios from "axios-hooks";

const url = "/user";

const useGetUser = (name, email) => {
  const params = { name, email };

  const queryConfig = {
    method: "GET",
    url: `${url}`,
    params,
  };
  const [{ data, loading, error }, refetch] = useAxios(queryConfig, {
    manual: true,
    autoCancel: false,
    useCache: false,
  });

  return { data, loading, error, refetch };
};

export default useGetUser;
