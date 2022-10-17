import React from "react";
import * as S from "./modules.styles";

const Transactions = ({ transactionArray }) => {
  return transactionArray?.map((t, idx) => {
    const date = new Date(t.createdAt).toDateString();
    return (
      <S.TransactionWrapper key={idx}>
        <div>
          <b>Amount: </b>
          <p>£{t.amount}</p>
        </div>
        <div>
          <p>{date}</p>
        </div>
      </S.TransactionWrapper>
    );
  });
};

export default Transactions;
