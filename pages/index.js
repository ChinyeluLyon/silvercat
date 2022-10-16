import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import jwt_decode from "jwt-decode";
import usePostCreateUser from "../frontendapi/UsePostCreateUser";

export default function Home() {
  const [user, setUser] = useState();

  const { fetch: createUser } = usePostCreateUser();

  const handleSignOut = (ev) => {
    setUser(null);
    document.getElementById("signInDiv").hidden = false;
  };

  const handleCallbackResponse = async (response) => {
    console.log("JWT: ", response.credential);
    const userObj = jwt_decode(response.credential);
    console.log("user: ", userObj);
    setUser(userObj);
    await createUser({ name: userObj.name });
    document.getElementById("signInDiv").hidden = true;
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
  }, []);

  return (
    <div>
      <div id={"signInDiv"}></div>
      {user && (
        <div>
          <image src={user.picture} />
          <h2>{user.name}</h2>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      )}
    </div>
  );
}
