import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Components/Pages/SignIn/SignIn";
import SignUp from "./Components/Pages/SignUp/SignUp";
import MainPage from "./Components/MainPage/MainPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/main-page" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
