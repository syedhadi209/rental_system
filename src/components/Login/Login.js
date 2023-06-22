import React, { useState } from "react";
import "./Login.css";
import Header from "../Header/Header";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const override = {
  color: "gray",
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%,-50%)",
};

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const notify = () => toast.success("Login Successfull", { icon: true });

  const handleSubmit = () => {
    if (!email || !password) {
      setError("All Fields are Required!!");
    } else {
      setIsLoading(true);
      setError("");
      try {
        signInWithEmailAndPassword(auth, email, password)
          .then((res) => {
            console.log(res);
            notify();
            setIsLoading(false);
            navigate("/dashboard");
          })
          .catch((err) => {
            console.log(err.message);
            setError(err.message);
            setIsLoading(false);
          });
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  return (
    <>
      <Header />
      <ToastContainer />
      <div className="login-container">
        <div className="login-box">
          <div className="login-heading">
            <h2>Log In</h2>
          </div>
          <p className="error">{error ? error : ""}</p>
          <div className="login-inputs">
            <div className="input">
              <label htmlFor="email ">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>
            <SyncLoader
              loading={isLoading}
              size={10}
              cssOverride={override}
              color="grey"
            />
            <div className="input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="login-button">
            <button>Forget Password</button>
            <button onClick={() => handleSubmit()}>Login</button>
          </div>
        </div>
      </div>
    </>
  );
}
