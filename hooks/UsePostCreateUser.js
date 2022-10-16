import useAxios from "axios-hooks";

const url = "/user";

const usePostCreateUser = () => {
  const [{ data, loading, error }, refetch] = useAxios({}, { manual: true });

  const fetch = ({ name, email }) => {
    const queryConfig = {
      method: "POST",
      url: `${url}`,
      data: {
        name,
        email,
      },
    };
    return refetch(queryConfig);
  };

  return { data, loading, error, fetch };
};

export default usePostCreateUser;
