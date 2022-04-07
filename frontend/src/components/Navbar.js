import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { LogIn, LogOut } from 'react-feather'
import { useNavigate, Link } from 'react-router-dom'

const Navbar = ({ loggedIn, page, title }) => {
  const [joke, setJoke] = useState('')

  const apiKey = '3f220cadbc3646659ca213813545c978'
  let navigate = useNavigate()

  const logOut = async () => {
    await axios.post('/account/logout')
  }

  useEffect(() => {
    const getJoke = async () => {
      const { data } = await axios.get(`https://api.spoonacular.com/food/jokes/random?apiKey=${apiKey}`)
      setJoke(data.text.length < 120 ? joke : '')
    }
    getJoke()
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 mb-2">
      <div className="font-bold text-3xl">
        {(loggedIn && (page === 'home')) && (
          <h1>Welcome back, <span className="text-red">{loggedIn}</span></h1>
          
        )}
        {(!loggedIn && (page === 'home')) && (<h1>Welcome!</h1>)}
        {(page === 'saved') && (<h1 className="text-red">Saved Recipes</h1>)}
        {(page === 'planning') && (<h1 className="text-red">Planning</h1>)}
        {(page === 'home') && (<p className="font-medium text-base my-2">{joke}</p>)}
        {(page === 'recipe') && (<h1 className="text-red my-2">{title}</h1>)}
      </div>
      <div className="flex justify-start lg:justify-end items-center text-center text-sm lg:text-lg font-bold">
        <Link to="/" className="mr-2 lg:mx-6 hover:text-red transition duration-300">Recipes</Link>
        {!loggedIn && (
          <LogIn
            className="ml-2 lg:ml-6 inline-block hover:text-red transition duration-300 cursor-pointer"
            strokeWidth={3}
            onClick={() => navigate('/login')}
          />
        )}
        {loggedIn && (
          <>
            <Link to="/saved" className="mx-2 lg:mx-6 hover:text-red transition duration-300">Saved Recipes</Link>
            <Link to="/planning" className="mx-2 lg:mx-6 hover:text-red transition duration-300">Meal Planning</Link>
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
