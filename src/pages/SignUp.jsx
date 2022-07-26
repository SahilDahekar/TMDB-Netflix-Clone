import React, { useState } from 'react'
import Navbar from "../components/Navbar";
import { Link , useNavigate} from "react-router-dom";
import { UserAuth } from '../context/AuthContext';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <>
      <Navbar show={false}/>
      <div className="relative bg-black md:bg-netflix_bg h-screen w-full bg-cover">
        <div className="absolute top-0 left-0 w-full h-full bg-black/60"/>
        <div className="absolute w-[80%] sm:w-[70%] md:w-auto flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 md:p-16 md:bg-black/80">
          <h2 className="text-[2.5rem] font-semibold mb-8">Sign Up</h2>
          <form className="flex flex-col items-center mb-8" onSubmit={handleSubmit}>
            <input className="text-xl placeholder-[#8c8c8c] px-6 py-4 mb-4 rounded w-full md:min-w-[380px] bg-[#333] outline-none" 
              placeholder="Email" 
              type="email" 
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input className="text-xl placeholder-[#8c8c8c] px-6 py-4 mb-10 rounded w-full md:min-w-[380px] bg-[#333] outline-none" 
              placeholder="Password" 
              type="password" 
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-[#E50914] text-xl font-bold px-6 py-4 mb-4 rounded w-full md:min-w-[380px]">Sign Up</button>
            <div className="flex justify-between text-sm sm:text-base w-[99%] md:min-w-[375px] items-center">
              <div className="flex justify-between items-center w-[115px] sm:w-[125px]"><input className=" scale-150 accent-[#8c8c8c] " type="checkbox" name="remember me" id="remember-me" /><label className="text-[#8c8c8c]" htmlFor="remember-me">Remember me</label></div>
              <a className="text-[#8c8c8c] hover:underline" href="/" target="_blank">Need help?</a>
            </div>
          </form>
          <p className="text-[#8c8c8c] text-sm sm:text-xl ">Already have an account ? <Link to="/signIn" className="text-white hover:underline">Sign In</Link></p>
        </div>
      </div>
    </>
  )
}

export default SignUp;