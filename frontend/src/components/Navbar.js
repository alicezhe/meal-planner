import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { LogIn, LogOut } from 'react-feather'
import { useNavigate, Link } from 'react-router-dom'

const Navbar = ({ loggedIn, page }) => {
  const [joke, setJoke] = useState('')

  const apiKey = 'e15639e1fce043b6a7cefa240347eebc'
  let navigate = useNavigate()

  const logOut = async () => {
    await axios.post('/account/logout')
  }

  useEffect(() => {
    // const getJoke = async () => {
    //   const { data } = await axios.get(`https://api.spoonacular.com/food/jokes/random?apiKey=${apiKey}`)
    //   setJoke(data.text.length < 120 ? joke : '')
    // }
    // getJoke()
  }, [])

  return (
    <div className="flex justify-between w-full">
      <div className="font-bold text-3xl">
        {(loggedIn && (page === 'home')) && (
          <h1>Welcome back, <span className="text-red">{loggedIn}</span></h1>
          
        )}
        {(!loggedIn && (page === 'home')) && (<h1>Welcome!</h1>)}
        {(page === 'saved') && (<h1 className="text-red">Saved Recipes</h1>)}
        {(page === 'planning') && (<h1 className="text-red">Planning</h1>)}
        {(page === 'home') && (<p className="font-medium text-base my-2">{joke}</p>)}
      </div>
      <div className="flex justify-center text-lg font-bold">
        {!loggedIn && (
          <LogIn
            className="ml-6 inline-block hover:text-red transition duration-300 cursor-pointer"
            strokeWidth={3}
            onClick={() => navigate('/login')}
          />
        )}
        {loggedIn && (
          <>
            <Link to="/" className="mx-6 hover:text-red transition duration-300">Recipes</Link>
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
