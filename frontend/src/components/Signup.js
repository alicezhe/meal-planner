import axios from 'axios'
import { React, useState } from 'react'

import { useNavigate, Link } from 'react-router-dom'

const Signup = () => {
  const [formUsername, setFormUsername] = useState('')
  const [formPassword, setFormPassword] = useState('')
  const [formFname, setFormFname] = useState('')
  const [formLname, setFormLname] = useState('')

  let navigate = useNavigate()

  const signupUser = async () => {
    await axios.post('/account/signup', { 
      username: formUsername,
      password: formPassword,
      name: { 
        fname: formFname,
        lname: formLname,
      } 
    })
    .then((response) => {
      if (response.data !== 'User has signed up successfully.') {
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
      <h1 className="text-4xl font-semibold text-center">Sign Up</h1>
      <form>
        <div className="my-5">
          <div className="w-1/2 inline-block pr-2">
            <label
              htmlFor="fname"
              className="block font-medium mb-2"
            >
              First name
            </label>
            <input
              type="text"
              id="fname"
              onChange={e => setFormFname(e.target.value)}
              className="border border-medium-gray rounded-md w-full"
            />
          </div>
          <div className="w-1/2 inline-block pl-2">
            <label
              htmlFor="lname"
              className="block font-medium mb-2"
            >
              Last name
            </label>
            <input
              type="text"
              id="lname"
              onChange={e => setFormLname(e.target.value)}
              className="border border-medium-gray rounded-md w-full"
            />
          </div>
        </div>
        <div className="my-5">
          <label
            htmlFor="username"
            className="block font-medium mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            onChange={e => setFormUsername(e.target.value)}
            className="border border-medium-gray rounded-md w-full"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password"
            className="block font-medium mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={e => setFormPassword(e.target.value)}
            className="border border-medium-gray rounded-md w-full"
          />
        </div>
        <button
          type="button"
          onClick={() => signupUser()}
          className="block my-5 bg-red rounded-md w-full p-1 text-white"
        >
          Sign up
        </button>
      </form>
      <p className="text-center">
        Already have an account? <span><Link to="/login" className="text-red hover:text-medium-gray transition duration-300">Login in here!</Link></span>
      </p>
    </div>
  )
}

export default Signup
