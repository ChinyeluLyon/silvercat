import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useGetUser from "../../hooks/UseGetUser";
import Transactions from "../../modules/transactions";
import useGetTransactions from "../../hooks/UseGetTransactions";
import SendMoney from "../../modules/sendMoney";

const Home = () => {
  const router = useRouter();

  const { data: userData, fetch: getUser } = useGetUser();
  const { data: transactionsData, refetch: getTransactions } =
    useGetTransactions(userData?._id);

  const handleSignOut = (ev) => {
    sessionStorage.removeItem("user");
    router.push("/");
  };

  useEffect(() => {
    if (sessionStorage.getItem("user") == null) {
      router.push("/");
    } else {
      const seshUser = JSON.parse(sessionStorage.getItem("user"));
      getUser({ name: seshUser.name, email: seshUser.email });
    }
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat().format(value);
  };

  return (
    <div>
      <button onClick={handleSignOut}>Sign out</button>
      <h1>Bambank</h1>

      <hr />
      <div>
        <h1>Welcome {userData?.name}</h1>
        <h2>Balance: €{formatCurrency(userData?.balance)}</h2>
      </div>

      <h2>Send Money</h2>
      <SendMoney
        currentUser={userData}
        getTransactions={getTransactions}
        getUser={getUser}
      />

      <h2>Transactions</h2>
      <Transactions transactionArray={transactionsData} />
    </div>
  );
};

export default Home;
