import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import usePostCreateUser from "../hooks/UsePostCreateUser";
import useGetTransactions from "../hooks/UseGetTransactions";
import useGetUser from "../hooks/UseGetUser";
import Transactions from "../modules/transactions";
import useGetUsers from "../hooks/UseGetUsers";

export default function Home() {
  const [user, setUser] = useState();
  const { fetch: createUser } = usePostCreateUser();
  const { data: transactionsData, refetch } = useGetTransactions(user?._id);
  const { data: usersData } = useGetUsers();
  const { data: userData, refetch: getUser } = useGetUser(
    user?.name,
    user?.email
  );

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

  const handleUserPrefill = async () => {
    const test = await getUser();
    console.log(test);
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
      handleUserPrefill();
    } else {
      document.getElementById("signInDiv").hidden = false;
    }
  }, []);

  useEffect(() => {
    if (user) {
      refetch();
    }
    if (user && sessionStorage.getItem("user") == null) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  const userOptions = usersData
    ?.filter((u) => u._id !== user?._id)
    .map((u, idx) => {
      return <option key={idx}>{u.name}</option>;
    });

  return (
    <div>
      <div id={"signInDiv"}></div>
      {user && (
        <div>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      )}

      <h2>Welcome {user?.name}</h2>
      <h3>Balance: £{user?.balance}</h3>
      <hr />

      <div>
        <div>
          <input type="number" />
          <select>
            <option disabled selected value>
              -- select a user --
            </option>
            {userOptions}
          </select>
        </div>
        <div>
          <button>Send Funds</button>
        </div>
      </div>

      <h2>Transactions</h2>
      <Transactions transactionArray={transactionsData} />
    </div>
  );
}
