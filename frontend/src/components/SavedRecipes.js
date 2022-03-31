import axios from 'axios'
import { React, useState, useEffect } from 'react'

import Navbar from './Navbar'
import RecipeCard from './RecipeCard'

const SavedRecipes = () => {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    const intervalID = setInterval(() => {
      const checkRecipes = async () => {
        const { data } = await axios.get('/api/recipes/saved')
        setRecipes(data)
      }
      checkRecipes()
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  return (
    <>
      <div className="flex flex-col justify-between w-full h-full bg-light-gray rounded-3xl p-12">
        <Navbar title="Saved Recipes" loggedIn={true}/>
        <div className="grid grid-cols-4 gap-8 mt-8">
          {recipes.map(recipe => 
            <RecipeCard 
              key={recipe}
              id={recipe}
              loggedIn={true}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default SavedRecipes
