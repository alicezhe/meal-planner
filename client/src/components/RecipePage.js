import axios from 'axios'
import { React, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import parse from 'html-react-parser'
import { Bookmark } from 'react-feather'
import Navbar from './Navbar'
import MealPlanForm from './MealPlanForm'

const RecipePage = () => {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const [recipe, setRecipe] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)
  const [recipeSaved, setRecipeSaved] = useState(false)

  const apiKey = '3f220cadbc3646659ca213813545c978'

  useEffect(() => {
    const loadRecipe = async () => {
      const { data } = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${apiKey}`)
      const kcal = data.nutrition.nutrients[0].amount
      const {
        title, image, summary, readyInMinutes: time, extendedIngredients,
      } = data
      let { analyzedInstructions } = data
      analyzedInstructions = analyzedInstructions ? analyzedInstructions[0].steps : []
      setRecipe({
        title, image, summary: parse(summary), time, kcal, extendedIngredients, analyzedInstructions,
      })
    }
    loadRecipe()
  }, [])

  useEffect(() => {
    const intervalID = setInterval(() => {
      const checkLoggedIn = async () => {
        const { data } = await axios.get('/account/isLoggedIn')
        setLoggedIn(data)
      }
      const checkSaved = async () => {
        const { data } = await axios.get(`/api/recipes/checksaved/${id}`)
        setRecipeSaved(data)
      }
      checkLoggedIn()
      checkSaved()
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  const save = async () => {
    await axios.post('/api/recipes/save', { id })
      .then(response => {
        if (response.data !== 'User has successfully saved recipe.') {
          window.alert(response.data)
        }
      }, error => {
        window.alert(error)
      })
  }

  const unsave = async () => {
    await axios.post('/api/recipes/unsave', { id })
      .then(response => {
        if (response.data !== 'User has successfully unsaved recipe.') {
          window.alert(response.data)
        }
      }, error => {
        window.alert(error)
      })
  }

  return (
    <>
      <div className="flex flex-col justify-start w-full h-full bg-light-gray rounded-3xl p-12">
        <Navbar loggedIn={loggedIn} page="recipe" title={recipe.title} />
        <div className="overflow-y-scroll scroll-div">
          <div className="grid grid-cols-none md:grid-cols-3 my-4">
            <div className="md:col-span-1 w-full h-[250px]">
              <div className={`relative w-full h-full rounded-2xl ${recipe.image ? `bg-[url(${recipe.image})]` : 'bg-medium-gray'} bg-no-repeat bg-center bg-cover`}>
                <div className="absolute top-0 right-0 flex justify-end m-4">
                  {(loggedIn && !recipeSaved) && (
                    <Bookmark
                      className="text-white hover:fill-white cursor-pointer"
                      strokeWidth={3}
                      width={18}
                      height={18}
                      onClick={() => save()}
                    />
                  )}
                  {(loggedIn && recipeSaved) && (
                    <Bookmark
                      className="text-white hover:fill-transparent fill-white cursor-pointer"
                      strokeWidth={3}
                      width={18}
                      height={18}
                      onClick={() => unsave()}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="md:col-span-2 mt-8 md:mt-0 md:ml-8">
              {recipe.summary}
            </div>
          </div>
          <div className="grid grid-cols-none md:grid-cols-3">
            <div className="md:col-span-1">
              <h3 className="text-red text-xl font-bold">Ingredients</h3>
              <div>
                <ul style={{ columns: 2 }}>
                  {recipe.extendedIngredients?.map(ingredient => {
                    if (ingredient.id && ingredient.original) {
                      return <li key={ingredient.id} className="my-2">{ingredient.original}</li>
                    }
                    return <></>
                  })}
                </ul>
              </div>
              <div>
                <h3 className="text-red text-xl font-bold my-3">Add to Meal Plan</h3>
                <MealPlanForm id={id} title={recipe.title} image={recipe.image} canCancel={false} />
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="md:ml-8">
                <h2 className="font-bold text-red text-xl">Recipe</h2>
                <ol>
                  {recipe.analyzedInstructions?.map(step => {
                    if (step.number && step.step) {
                      return (
                        <li key={step.number} className="my-2">
                          <p>
                            &#8226;
                            {step.step}
                          </p>
                        </li>
                      )
                    }
                    return <></>
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
