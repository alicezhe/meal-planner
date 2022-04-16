import axios from 'axios'
import { React, useState, useEffect } from 'react'

import Navbar from './Navbar'
import RecipeCard from './RecipeCard'
import '../styles/TagSearch.css'

const SavedRecipes = () => {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    const intervalID = setInterval(() => {
      const checkRecipes = async () => {
        const { data } = await axios.get('/api/recipes/saved')
        setRecipes(data)
      }
      checkRecipes()
    }, 1000)
    return () => clearInterval(intervalID)
  }, [])

  return (
    <>
      <div className="flex flex-col justify-start w-full h-full bg-light-gray rounded-3xl p-12">
        <Navbar page="saved" loggedIn />
        <div className="overflow-y-scroll scroll-div">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
            {recipes.map(recipe => (
              <RecipeCard
                key={recipe}
                id={recipe}
                loggedIn
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default SavedRecipes
