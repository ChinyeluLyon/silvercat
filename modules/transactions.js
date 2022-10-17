import React, { useEffect, useState } from "react";
import useGetUserById from "../hooks/UseGetUserById";
import { formatCurrency } from "../pages/home";
import * as S from "./modules.styles";

const Transaction = ({ transaction }) => {
  const { data: userData, fetch: getUser } = useGetUserById();
  const [toFrom, setToFrom] = useState();

  useEffect(() => {
    if (transaction?.recipientId) {
      getUser({ id: transaction.recipientId });
      setToFrom("to");
    }
    if (transaction?.senderId) {
      getUser({ id: transaction.senderId });
      setToFrom("from");
    }
  }, [transaction]);

  const date = new Date(transaction?.createdAt);

  return (
    <S.TransactionWrapper>
      <div>
        <b>Amount: </b>
        <S.Amount amount={transaction?.amount}>
          €{formatCurrency(Math.abs(transaction?.amount))}
        </S.Amount>
      </div>
      <div>
        <p>{`${date.toDateString()}, ${date.toLocaleTimeString()}`}</p>
        {userData && <div>{`Sent ${toFrom} ${userData.name}`}</div>}
      </div>
    </S.TransactionWrapper>
  );
};

export default Transaction;
