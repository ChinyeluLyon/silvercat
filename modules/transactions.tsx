import React from "react";

const Transactions = ({ transactionArray }) => {
  return transactionArray?.map((t, idx) => {
    const date = new Date(t.createdAt).toDateString();
    return (
      <div key={idx}>
        <div>
          <div>
            <b>Amount: </b>
            <p>£{t.amount}</p>
          </div>
          <div>
            <p>{date}</p>
          </div>
        </div>
      </div>
    );
  });
};

export default Transactions;
