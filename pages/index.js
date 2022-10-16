import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import usePostCreateUser from "../hooks/UsePostCreateUser";
import useGetTransactions from "../hooks/UseGetTransactions";
import Transactions from "../modules/transactions";

export default function Home() {
  const [user, setUser] = useState();
  const { fetch: createUser } = usePostCreateUser();
  const { data: transactionsData } = useGetTransactions(user?._id);

  console.log(user?._id);
  console.log(transactionsData);

  const hideSignIn = (hidden) => {
    document.getElementById("signInDiv").hidden = hidden;
  };

  const handleSignOut = (ev) => {
    // setUser(null);
    hideSignIn(false);
  };

  const handleCallbackResponse = async (response) => {
    // console.log("JWT: ", response.credential);
    const userObj = jwt_decode(response.credential);
    // console.log("user: ", userObj);
    const { data: userData } = await createUser({
      name: userObj.name,
      email: userObj.email,
    });
    console.log(userData);
    setUser(userData);
    hideSignIn(true);
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "372579444113-pordtetr86a6u6vfidq2v7ch61a40bjr.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    const userSessionData = JSON.parse(sessionStorage.getItem("user"));
    console.log(userSessionData);
    if (userSessionData) {
      setUser(userSessionData);
      hideSignIn(true);
    } else {
      document.getElementById("signInDiv").hidden = false;
    }
  }, []);

  useEffect(() => {
    if (user && sessionStorage.getItem("user") == null) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  return (
    <div>
      <div id={"signInDiv"}></div>
      {user && (
        <div>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      )}

      <h2>Welcome {user?.name}</h2>
      <h2>Welcome {user?._id}</h2>
      <hr />

      <Transactions transactionArray={transactionsData} />
    </div>
  );
}
