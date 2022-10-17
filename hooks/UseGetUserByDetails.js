import useAxios from "axios-hooks";

const url = "/user";

const useGetUserByDetails = () => {
  const [{ data, loading, error }, refetch] = useAxios(
    {},
    {
      manual: true,
      autoCancel: false,
      useCache: false,
    }
  );

  const fetch = ({ name, email }) => {
    const queryConfig = {
      method: "GET",
      url: `${url}`,
      params: { name, email },
    };
    return refetch(queryConfig);
  };
  return { data, loading, error, fetch };
};

export default useGetUserByDetails;
