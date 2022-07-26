import React, { useState } from 'react'
import Navbar from "../components/Navbar";
import { Link , useNavigate} from "react-router-dom";
import { UserAuth } from '../context/AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error , setError] = useState("");
  const { logIn } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }

  }

  const demoLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn("test@test.com", "password");
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }

  }

  return (
    <>
      <Navbar show={false}/>
      <div className="relative bg-black md:bg-netflix_bg h-screen w-full bg-cover">
        <div className="absolute top-0 left-0 w-full h-full bg-black/60"/>
        <div className="absolute flex flex-col w-[80%] sm:w-[70%] md:w-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 md:p-16 md:bg-black/80">
          <h2 className="text-[2.5rem] font-semibold mb-8">Sign In</h2>
          {error && <p className="text-yellow-400 mb-5">{error}</p>}
          <form className="flex flex-col items-center mb-8" onSubmit={handleSubmit}>
            <input className="text-xl placeholder-[#8c8c8c] px-6 py-4 mb-4 rounded w-full sm:min-w-[380px] bg-[#333] outline-none" 
              placeholder="Email" 
              type="email" 
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input className="text-xl placeholder-[#8c8c8c] px-6 py-4 mb-10 rounded w-full sm:min-w-[380px] bg-[#333] outline-none" 
              placeholder="Password" 
              type="password" 
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-[#E50914] text-xl font-bold px-6 py-4 mb-4 rounded w-full sm:min-w-[380px]">Sign In</button>
            <button onClick={demoLogin} className="bg-[#E50914] text-xl font-bold px-6 py-4 mb-4 rounded w-full sm:min-w-[380px]">Demo Login</button>
            <div className="flex justify-between text-sm sm:text-base w-[99%] md:min-w-[375px] items-center">
              <div className="flex justify-between items-center w-[115px] sm:w-[125px]"><input className="scale-150 accent-[#8c8c8c]" type="checkbox" name="remember me" id="remember-me" /><label className="text-[#8c8c8c]" htmlFor="remember-me">Remember me</label></div>
              <a className="text-[#8c8c8c] hover:underline" href="/" target="_blank">Need help?</a>
            </div>
          </form>
            <p className="text-[#8c8c8c] text-sm sm:text-xl ">New to Netflix? <Link to="/signUp" className="text-white hover:underline">Sign Up</Link></p>
        </div>
      </div>
    </>
  )
}

export default SignIn;