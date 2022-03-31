import { React } from 'react'
import axios from 'axios'
import { LogIn, LogOut } from 'react-feather'
import { useNavigate, Link } from 'react-router-dom'

const Navbar = ({ loggedIn }) => {

  let navigate = useNavigate()

  const logOut = async () => {
    await axios.post('/account/logout')
  }

  return (
    <div className="flex justify-between w-full">
      <div className="font-bold text-3xl">
        {loggedIn && (<h1>Welcome back, <span className="text-red">{loggedIn}</span></h1>)}
        {!loggedIn && (<h1>Welcome!</h1>)}
        <p className="font-medium text-base my-2">Any salad can be a Caesar salad if you stab it enough.</p>
      </div>
      <div className="flex justify-center text-lg font-bold">
        <Link to="/" className="mx-6 hover:text-red transition duration-300">Recipes</Link>
        {!loggedIn && (
          <LogIn
            className="ml-6 inline-block hover:text-red transition duration-300 cursor-pointer"
            strokeWidth={3}
            onClick={() => navigate('/login')}
          />
        )}
        {loggedIn && (
          <>
            <Link to="/saved" className="mx-6 hover:text-red transition duration-300">Saved Recipes</Link>
            <Link to="/planning" className="mx-6 hover:text-red transition duration-300">Meal Planning</Link>
            <LogOut
              className="ml-6 inline-block hover:text-red transition duration-300 cursor-pointer"  
              strokeWidth={3}
              onClick={logOut}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
