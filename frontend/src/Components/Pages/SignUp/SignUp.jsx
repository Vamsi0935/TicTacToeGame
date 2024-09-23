import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./signup.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://tic-tac-toe-game-api-taupe.vercel.app/api/users/signup",
        { name, email, password }
      );
      Swal.fire({
        icon: "success",
        title: "Signed up successfully",
        text: response.data.message,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Sign Up Failed",
        text: error.response?.data.message || "Something went wrong",
      });
    }
  };

  return (
    <>
      <h1 className="display-4 title">TicTacToe Multiplayer Game</h1>
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="vamsikrishnadudyala"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="signup-button">
            <button type="submit" className="btn btn-light text-dark">
              SignUp
            </button>
            <p>
              Already have an account? <Link to="/" className="text-decoration-none">Login here</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
