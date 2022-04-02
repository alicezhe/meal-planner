import axios from 'axios'
import { React, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import parse from 'html-react-parser'
import Navbar from './Navbar'
import RecipeCard from './RecipeCard'

const RecipePage = () => {
  const [searchParams] = useSearchParams()
  const [id, setId] = useState(searchParams.get('id'))
  const [recipe, setRecipe] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)

  const apiKey = '93c826ea462347fca104e57df38fcf1b'

  useEffect(() => {
    const loadRecipe = async () => {
      const { data } = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${apiKey}`)
      const kcal = data.nutrition.nutrients[0].amount
      console.log(data)
      let { title, image, summary, readyInMinutes: time, extendedIngredients, analyzedInstructions} = data
      analyzedInstructions = analyzedInstructions ? analyzedInstructions[0].steps : []
      setRecipe({ title, image, summary: parse(summary), time, kcal, extendedIngredients, analyzedInstructions })
    }
    loadRecipe()
  }, [])

  useEffect(() => {
    const intervalID = setInterval(() => {
      const checkLoggedIn = async () => {
        const { data } = await axios.get('/account/isLoggedIn')
        setLoggedIn(data)
      }
      // const checkSaved = async () => {
      //   const { data } = await axios.post('/api/recipes/checksaved', { id })
      //   setRecipeSaved(data)
      // }
      // checkSaved()
      checkLoggedIn()
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  // const viewRecipe = () => {
  //   recipe.analyzedInstructions.steps.map(step => console.log(step.step))
  //   recipe.analyzedInstructions.map(step => console.log(step.step))
  // }

  return (
    <>
      <div className="flex flex-col justify-start w-full h-full bg-light-gray rounded-3xl p-12">
        <Navbar loggedIn={loggedIn} page="recipe" title={recipe.title} />
        <div className="overflow-y-scroll scroll-div">
          <div className="grid grid-cols-none md:grid-cols-3 my-4">
            <div className="md:col-span-1 w-full h-[250px]">
              <div className={`w-full h-full rounded-2xl bg-[url('${recipe.image}')] bg-no-repeat bg-center bg-cover`}></div>
            </div>
            <div className="md:col-span-2 mt-8 md:mt-0 md:ml-8">
              {recipe.summary}
            </div>
          </div>
          <div className="grid grid-cols-none md:grid-cols-3">
            <div className="md:col-span-1">
              <h3 className="text-red text-xl font-bold">Ingredients</h3>
              <div>
                <ul style={{columns: 2}}>
                  {recipe.extendedIngredients?.map(ingredient => {
                    if (ingredient.id && ingredient.original) return <li key={ingredient.id} className="my-2">{ingredient.original}</li>
                  })}
                </ul>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="md:ml-8">
                <h2 className="font-bold text-red text-xl">Recipe</h2>
                <ol>
                  {recipe.analyzedInstructions?.map(step => {
                    if (step.number && step.step) {
                      return <li key={step.number} className="my-2"><p>&#8226; {step.step}</p></li>
                    }
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RecipePage
