import useAxios from "axios-hooks";

const url = "/user";

const useGetUser = (name, email) => {
  const params = { name, email };

  if (name == null || email == null) {
    throw new Error("name and email must be defined");
  }

  const queryConfig = {
    method: "get",
    url: `${url}`,
    params,
  };
  const [{ data, loading, error }, refetch] = useAxios(queryConfig, {
    useCache: false,
    manual: true,
  });

  return { data, loading, error, refetch };
};

export default useGetUser;
