import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const [user, setUser] = useState();

  const handleSignOut = (ev) => {
    sessionStorage.removeItem("user");
    router.push("/loginSignup");
  };

  useEffect(() => {
    if (sessionStorage.getItem("user") == null) {
      router.push("/loginSignup");
    } else {
      const seshUser = sessionStorage.getItem("user");
      setUser(JSON.parse(seshUser));
    }
  }, []);

  return (
    <div>
      <button onClick={handleSignOut}>Sign out</button>
      <h1>Welcome {user?.name}</h1>
      <hr />
    </div>
  );
};

export default Home;
