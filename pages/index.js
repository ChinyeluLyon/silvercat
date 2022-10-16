import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import jwt_decode from "jwt-decode";
import usePostCreateUser from "../frontendapi/UsePostCreateUser";

export default function Home() {
  const [user, setUser] = useState();

  const { fetch: createUser } = usePostCreateUser();

  const hideSignIn = (hidden) => {
    document.getElementById("signInDiv").hidden = hidden;
  };

  const handleSignOut = (ev) => {
    setUser(null);
    hideSignIn(false);
  };

  const handleCallbackResponse = async (response) => {
    // console.log("JWT: ", response.credential);
    const userObj = jwt_decode(response.credential);
    // console.log("user: ", userObj);
    setUser(userObj);
    await createUser({ name: userObj.name });
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
          <img src={user.picture} />
          <h2>{user.name}</h2>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      )}
    </div>
  );
}
