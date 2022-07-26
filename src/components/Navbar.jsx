import React from 'react';
import { Link , useLocation , useNavigate} from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Navbar = ({ show }) => {
  const {user, logOut} = UserAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogOut = async (e)=> {
    e.preventDefault();
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="relative min-w-[280px] max-w-[1650px] mx-auto">
      <div className='flex justify-between items-center px-6 md:px-8 py-10 w-full absolute left-1/2 transform -translate-x-1/2 z-[100]'>
          <Link to="/"><img className="w-32 md:w-40" src="//images.ctfassets.net/y2ske730sjqp/821Wg4N9hJD8vs5FBcCGg/9eaf66123397cc61be14e40174123c40/Vector__3_.svg?w=460" alt="logo"/></Link>
          {location.pathname === "/account" && user ? <button onClick={handleLogOut} className='bg-[#E50914] text-sm md:text-xl font-normal py-2 px-5 mr-4 rounded whitespace-nowrap'>Log Out</button> :
          <>
            {show && <div className='flex items-center'>
              {user ?
              <>
            
                <Link to="/account"><img className="w-14" src={process.env.PUBLIC_URL + `/images/netflix account.png`} alt="account logo"/></Link>
              </>
              :
              <Link to="/signIn"><button className='bg-[#E50914] text-sm md:text-xl font-normal py-2 px-5 rounded whitespace-nowrap'>Sign In</button></Link> }
            </div>}
          </>
          }
      </div>
    </div>
  )
}

export default Navbar;