import React, { useContext, useEffect } from "react";
// import { auth, db } from "../../firebase";
// import { signOut } from "firebase/auth";
import { AuthContext } from "../../AuthProvider";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";

function Home() {
  const { currentUser } = useContext(AuthContext);
  console.log("Home", currentUser);

  useEffect(() => {}, [currentUser]);

  return <>{currentUser ? <Dashboard /> : <Login />}</>;
}

export default Home;
