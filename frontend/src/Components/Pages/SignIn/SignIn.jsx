import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./signin.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signin",
        { email, password }
      );
      Swal.fire({
        icon: "success",
        title: "Signed in successfully",
        text: response.data.message,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/main-page");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Sign In Failed",
        text: error.response?.data.message || "Something went wrong",
      });
    }
  };

  return (
    <>
      <h1 className="display-4 title">TicTacToe Multiplayer Game</h1>
      <div className="signin-container">
        <h1>Sign In</h1>
        <form onSubmit={handleSignIn}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="vamsi@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              className="form-control"
              id="password"
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              style={{
                position: "absolute",
                right: "10px",
                top: "38px",
                cursor: "pointer",
              }}
            >
              {isPasswordVisible ? (
                <FaEye className="icon" />
              ) : (
                <FaEyeSlash className="icon" />
              )}{" "}
            </span>
          </div>
          <div className="signin-button">
            <button type="submit" className="btn btn-light text-dark">
              SignIn
            </button>
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-decoration-none">
                Create an account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
