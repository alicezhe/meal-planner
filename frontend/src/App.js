import { React } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import SavedRecipes from './components/SavedRecipes'
import MealPlanning from './components/MealPlanning'
import RecipePage from './components/RecipePage'

const App = () => {
  return (
    <Router>
      <div className="flex flex-col items-center justify-center h-screen bg-red text-dark-gray font-rubik p-12">
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="saved" element={<SavedRecipes />} />
          <Route path="planning" element={<MealPlanning />} />
          <Route path="recipes" element={<RecipePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App