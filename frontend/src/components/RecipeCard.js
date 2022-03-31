import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'
import { Bookmark } from 'react-feather'
import { set } from 'express/lib/application'

const RecipeCard = ({ id, loggedIn }) => {
  const [recipe, setRecipe] = useState({title: 'Classic French Onion Soup',
  time: '45',
  kcal: '412',
  image: 'https://spoonacular.com/recipeImages/639597-556x370.jpg',
  summary: 'If you want to add more Mediterranean recipes to your collection, Classic French Onion Soup might be a recipe you should try. For $2.94 per serving, you get a main course that serves 4. One portion of this'})
  const [recipeSaved, setRecipeSaved] = useState(false)

  const apiKey = 'e15639e1fce043b6a7cefa240347eebc'

  useEffect(() => {
    const intervalID = setInterval(() => {
      const checkSaved = async () => {
        const { data } = await axios.post('/api/recipes/checksaved', { id })
        setRecipeSaved(data)
      }
      checkSaved()
    }, 1000)
    return () => clearInterval(intervalID)
  }, [])

  useEffect(() => {
    // const loadRecipe = async () => {
    //   const { data } = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${apiKey}`)
    //   const kcal = data.nutrition.nutrients[0].amount
    //   const { title, image, summary, readyInMinutes: time} = data
    //   setRecipe({ title, image, summary: parse(summary), time, kcal })
    // }
    // loadRecipe()
  }, [])
  
  const save = async () => {
    await axios.post('/api/recipes/save', { id })
    .then((response) => {
      if (response.data !== 'User has successfully saved recipe.') {
        window.alert(response.data)
      }
    }, (error) => {
      window.alert(error)
    })
  }

  const unsave = async () => {
    await axios.post('/api/recipes/unsave', { id })
    .then((response) => {
      if (response.data !== 'User has successfully unsaved recipe.') {
        window.alert(response.data)
      }
    }, (error) => {
      window.alert(error)
    })
  }

  return (
    <div className="relative h-[400px] bg-white rounded-[30px]"> 
      {(loggedIn && !recipeSaved) && (
        <Bookmark 
          className="absolute top-0 right-0 text-white m-4 hover:fill-white cursor-pointer"
          strokeWidth={3} 
          onClick={() => save()}
        />
      )}
      {(loggedIn && recipeSaved) && (
        <Bookmark 
          className="absolute top-0 right-0 text-white m-4 hover:fill-transparent fill-white cursor-pointer"
          strokeWidth={3}
          onClick={() => unsave()}
        />
      )}
      <div className={`bg-[url(${recipe.image})] h-1/2 bg-center bg-no-repeat bg-cover rounded-t-[30px]`}></div>
      <div className="w-full h-1/2 p-4 rounded-b-[30px]">
        <div className="h-full pb-2 overflow-y-hidden">  
          <h3 className="text-red text-xl font-semibold text-center mb-2">{recipe.title}</h3>
          <div className="flex justify-between font-medium mb-2">
            <p>&#9200; {recipe.time} min</p>
            <p>&#128293; {recipe.kcal} kcal</p>
          </div>
          <p>{recipe.summary}</p>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
