import React, { useContext } from "react";
import "./Header.css";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../../AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigation = useNavigate();
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="container">
      <h2>Rental System</h2>
      {currentUser ? (
        <button
          onClick={() => {
            signOut(auth);
            navigation("/");
          }}
        >
          Sign out
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
