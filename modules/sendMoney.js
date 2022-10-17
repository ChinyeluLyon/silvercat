import React, { useState } from "react";
import useGetUsers from "../hooks/UseGetUsers";
import usePostSendMoney from "../hooks/UsePostSendMoney";

const SendMoney = ({ currentUser, getTransactions, getUser }) => {
  const [amount, setAmount] = useState();
  const [recipientId, setRecipientId] = useState();
  const { fetch: sendMoney } = usePostSendMoney(currentUser?._id);
  const { data: usersData } = useGetUsers();

  const userOptions = usersData
    ?.filter((u) => u._id !== currentUser?._id)
    .map((u, idx) => {
      return (
        <option key={idx} value={u._id}>
          {u.name}
        </option>
      );
    });

  return (
    <div>
      <div>
        <input
          type="number"
          placeholder="Amount"
          onChange={(ev) => {
            setAmount(ev.target.value);
          }}
        />
        <select
          onChange={(ev) => {
            setRecipientId(ev.target.value);
          }}
        >
          <option disabled selected value>
            -- select a user --
          </option>
          {userOptions}
        </select>
      </div>

      <div>
        <button
          onClick={async () => {
            await sendMoney({
              amount,
              recipientUserId: recipientId,
              currentUserId: currentUser?._id,
            });
            await getTransactions();
            await getUser({
              name: currentUser?.name,
              email: currentUser?.email,
            });
          }}
        >
          Send Funds
        </button>
      </div>
    </div>
  );
};

export default SendMoney;
