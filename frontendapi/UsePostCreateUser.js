import useAxios from "axios-hooks";

const url = "/user";

const usePostCreateUser = () => {
  const [{ data, loading, error }, refetch] = useAxios({}, { manual: false });

  const fetch = ({ name }) => {
    const queryConfig = {
      method: "POST",
      url: `${url}`,
      data: {
        name,
      },
    };
    return refetch(queryConfig);
  };

  return { data, loading, error, fetch };
};

export default usePostCreateUser;
