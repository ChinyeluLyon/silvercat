import useAxios from "axios-hooks";

const url = "/user";

const useGetUserById = () => {
  const [{ data, loading, error }, refetch] = useAxios(
    {},
    {
      manual: true,
      autoCancel: false,
      useCache: false,
    }
  );

  const fetch = ({ id }) => {
    const queryConfig = {
      method: "GET",
      url: `${url}/${id}`,
    };
    return refetch(queryConfig);
  };
  return { data, loading, error, fetch };
};

export default useGetUserById;
