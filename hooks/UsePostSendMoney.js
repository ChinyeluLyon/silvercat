import useAxios from "axios-hooks";

const url = "/sendMoney";

const usePostSendMoney = () => {
  const [{ data, loading, error }, refetch] = useAxios({}, { manual: true });

  const fetch = ({ amount, currentUserId, recipientUserId }) => {
    const queryConfig = {
      method: "POST",
      url: `${url}`,
      data: {
        amount,
        currentUserId,
        recipientUserId,
      },
    };
    return refetch(queryConfig);
  };

  return { data, loading, error, fetch };
};

export default usePostSendMoney;
