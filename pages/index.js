import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useGetUserByDetails from "../hooks/UseGetUserByDetails";
import Transactions from "../modules/transactions";
import useGetTransactions from "../hooks/UseGetTransactions";
import SendMoney from "../modules/sendMoney";
import * as S from "./main.styles";

export const formatCurrency = (value) => {
  return new Intl.NumberFormat().format(value);
};

const Home = () => {
  const router = useRouter();

  const { data: userData, fetch: getUser } = useGetUserByDetails();
  const { data: transactionsData, refetch: getTransactions } =
    useGetTransactions(userData?._id);

  const handleSignOut = (ev) => {
    sessionStorage.removeItem("user");
    router.push("/login");
  };

  useEffect(() => {
    if (sessionStorage.getItem("user") == null) {
      router.push("/login");
    } else {
      const seshUser = JSON.parse(sessionStorage.getItem("user"));
      getUser({ name: seshUser.name, email: seshUser.email });
    }
  }, []);

  return (
    <div>
      <button onClick={handleSignOut}>Sign out</button>
      <h1>Bambank</h1>
      <button
        onClick={() => {
          router.push("/allUsers");
        }}
      >
        check other users 👀
      </button>

      <hr />
      <div>
        <h1>Welcome {userData?.name}</h1>
        <S.Amount amount={userData?.balance}>
          {userData?.balance < 0 && "-"}€
          {formatCurrency(Math.abs(userData?.balance))}
        </S.Amount>
      </div>

      <h2>Send Money</h2>
      <SendMoney
        currentUser={userData}
        getTransactions={getTransactions}
        getUser={getUser}
      />

      <h2>Transactions</h2>
      {transactionsData?.map((t) => (
        <Transactions transaction={t} />
      ))}
    </div>
  );
};

export default Home;
