import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import usePostCreateUser from "../hooks/UsePostCreateUser";
import useGetTransactions from "../hooks/UseGetTransactions";
import useGetUser from "../hooks/UseGetUser";
import Transactions from "../modules/transactions";
import useGetUsers from "../hooks/UseGetUsers";
import usePostSendMoney from "../hooks/UsePostSendMoney";
import { useRouter } from "next/router";

export default function Handler() {
  const router = useRouter();

  const [user, setUser] = useState();
  const [amount, setAmount] = useState();
  const [recipientId, setRecipientId] = useState();

  const { fetch: createUser } = usePostCreateUser();
  const { data: transactionsData, refetch: getTransactions } =
    useGetTransactions(user?._id);
  const { fetch: sendMoney } = usePostSendMoney(user?._id);
  const { data: usersData } = useGetUsers();
  const { data: userData, refetch: getUser } = useGetUser(
    user?.name,
    user?.email
  );

  const hideSignIn = (hidden) => {
    document.getElementById("signInDiv").hidden = hidden;
  };

  const handleSignOut = (ev) => {
    // setUser(null);
    hideSignIn(false);
  };

  const handleCallbackResponse = async (response) => {
    const userObj = jwt_decode(response.credential);
    const { data: userData } = await createUser({
      name: userObj.name,
      email: userObj.email,
    });
    setUser(userData);
    hideSignIn(true);
  };

  const handleUserPrefill = async () => {
    const test = await getUser();
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

    if (userSessionData) {
      // handleUserPrefill();
      router.push("/home");
    } else {
      router.push("/loginSignup");
      // document.getElementById("signInDiv").hidden = false;
    }
  }, []);

  useEffect(() => {
    if (user) {
      getTransactions();
    }
    if (user && sessionStorage.getItem("user") == null) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      // sessionStorage.removeItem("user");
    }
  }, [user]);

  const userOptions = usersData
    ?.filter((u) => u._id !== user?._id)
    .map((u, idx) => {
      return (
        <option key={idx} value={u._id}>
          {u.name}
        </option>
      );
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
                currentUserId: user._id,
              });
              await getTransactions();
              const test = await getUser();
            }}
          >
            Send Funds
          </button>
        </div>
      </div>

      <h2>Transactions</h2>
      <Transactions transactionArray={transactionsData} />
    </div>
  );
}
