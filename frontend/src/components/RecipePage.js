import axios from 'axios'
import { React, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import parse from 'html-react-parser'
import Navbar from './Navbar'

const RecipePage = () => {
  const [searchParams] = useSearchParams()
  const [id, setId] = useState(searchParams.get('id'))
  const [recipe, setRecipe] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)

  const apiKey = 'e15639e1fce043b6a7cefa240347eebc'

  useEffect(() => {
    const loadRecipe = async () => {
      const { data } = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${apiKey}`)
      const kcal = data.nutrition.nutrients[0].amount
      const { title, image, summary, readyInMinutes: time} = data
      setRecipe({ title, image, summary: parse(summary), time, kcal })
    }
    loadRecipe()
  }, [])

  useEffect(() => {
    const intervalID = setInterval(() => {
      const checkLoggedIn = async () => {
        const { data } = await axios.get('/account/isLoggedIn')
        setLoggedIn(data)
      }
      checkLoggedIn()
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  return (
    <>
      <div className="flex flex-col justify-between w-full h-full bg-light-gray rounded-3xl p-12">
        <Navbar loggedIn={loggedIn} page="recipe" title={recipe.title} />
         {recipe.image} {recipe.time} {recipe.kcal}
      </div>
    </>
  )
}

export default RecipePage
