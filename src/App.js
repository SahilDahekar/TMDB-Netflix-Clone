import React from "react";
import { Routes , Route } from "react-router-dom";
import Home from "./pages/Home";
import Account from "./pages/Account";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import {AuthContextProvider} from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route index path="/" element={<Home/>}/>
          <Route path="/account" element={<ProtectedRoute><Account/></ProtectedRoute>}/>
          <Route path="/signIn" element={<SignIn/>}/>
          <Route path="/signUp" element={<SignUp/>}/>
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
