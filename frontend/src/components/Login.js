import { React, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  let navigate = useNavigate()

  const loginUser = async () => {
    await axios.post('/account/login', {username, password})
    .then((response) => {
      if (response.data !== 'User has logged in successfully.') {
        window.alert(response.data)
      } else {
        navigate('/')
      }
    }, (error) => {
      window.alert(error)
    })
  }

  return (
    <div className="bg-white rounded-xl p-8">
      <h1 className="text-4xl font-semibold text-center">Log in</h1>
      <form>
        <div className="my-5">
          <label
            htmlFor="username"
            className="block font-medium mb-2"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="border border-medium-gray rounded-md w-full"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password"
            className="block font-medium mb-2"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border border-medium-gray rounded-md w-full"
          />
        </div>
        <button
          type="button"
          onClick={() => loginUser(username, password)}
          className="block my-5 bg-red rounded-md w-full p-1 text-white"
        >
          Log in
        </button>
      </form>
      <p className="text-center">
        Don&#39;t have an account? <span><Link to="/signup" className="text-red hover:text-medium-gray transition duration-300">Sign up here!</Link></span>
      </p>
    </div>
  )
}

export default Login
