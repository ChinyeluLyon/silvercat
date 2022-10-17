import useAxios from "axios-hooks";

const url = "/users";

const useGetUsers = (name, email) => {
  const params = { name, email };

  const queryConfig = {
    method: "get",
    url: `${url}`,
    params,
  };
  const [{ data, loading, error }, refetch] = useAxios(queryConfig, {
    manual: false,
  });

  return { data, loading, error, refetch };
};

export default useGetUsers;
