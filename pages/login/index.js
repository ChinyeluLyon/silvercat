import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import usePostCreateUser from "../../hooks/UsePostCreateUser";
import jwt_decode from "jwt-decode";

const LoginSignup = () => {
  const { fetch: createUser } = usePostCreateUser();
  const router = useRouter();

  const handleCallbackResponse = async (response) => {
    const userObj = jwt_decode(response.credential);
    const { data: userData } = await createUser({
      name: userObj.name,
      email: userObj.email,
    });
    const user = {
      name: userData.name,
      email: userData.email,
    };
    await sessionStorage.setItem("user", JSON.stringify(user));
    router.push("/");
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
    </div>
  );
};

export default LoginSignup;
