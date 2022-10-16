import React from "react";

const Transactions = ({ transactionArray }) => {
  return transactionArray?.map((t, idx) => {
    return (
      <div key={idx}>
        <div>
          <b>Amount: </b>
          <p>{t.amount}</p>
        </div>
      </div>
    );
  });
};

export default Transactions;
