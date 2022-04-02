import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'
import { Bookmark, Edit2, Check, X } from 'react-feather'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { set } from 'express/lib/application'

const RecipeCard = ({ id, loggedIn, ingredients }) => {
  const [recipe, setRecipe] = useState({})
  const [recipeSaved, setRecipeSaved] = useState(false)
  const [editingOn, setEditingOn] = useState(false)
  const [day, setDay] = useState('')
  const [time, setTime] = useState('')

  const apiKey = '3f220cadbc3646659ca213813545c978'

  let navigate = useNavigate()
  const params = { id }

  useEffect(() => {
    const intervalID = setInterval(() => {
      if (loggedIn) {
        const checkSaved = async () => {
          const { data } = await axios.post('/api/recipes/checksaved', { id })
          setRecipeSaved(data)
        }
        checkSaved()
      }
    }, 1000)
    return () => clearInterval(intervalID)
  }, [])

  useEffect(() => {
    const loadRecipe = async () => {
      const { data } = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${apiKey}`)
      const kcal = data.nutrition.nutrients[0].amount
      const { title, image, summary, readyInMinutes: time} = data
      setRecipe({ title, image, summary: parse(summary), time, kcal })
    }
    loadRecipe()
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

  const goToRecipe = () => {
    navigate({
      pathname: 'recipes',
      search: `?${createSearchParams(params)}`
    })
  }
  
  const addToPlan = async () => {
    await axios.post('/api/plan/add', { id, title:recipe.title, image:recipe.image, day, time })
    .then((response) => {
      window.alert(response.data)
      // if (response.data !== 'User has successfully added recipe to plan.') {
        
      // }
    }, (error) => {
      window.alert(error)
    })
  }

  return (
    <div className="relative h-[400px] bg-white rounded-[30px] m-2 hover:drop-shadow-md transition duration-300"> 
      <div className="absolute top-0 right-0 flex justify-end m-4">
        {loggedIn && (
          <Edit2
            className="text-white mx-2 hover:text-red transition duraction-200 cursor-pointer"
            strokeWidth={3}
            width={18} 
            height={18}
            onClick={() => setEditingOn(!editingOn)} />
        )}
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
      <div className={`bg-[url(${recipe.image})] h-1/2 bg-center bg-no-repeat bg-cover rounded-t-[30px]`} onClick={goToRecipe}></div>
      <div className="w-full h-1/2 p-4 rounded-b-[30px]">
        <div className="h-full pb-2 overflow-y-hidden">  
          <h3 className="text-red text-xl font-semibold text-center mb-2">{recipe.title}</h3>
          <div className="w-full text-center mb-2 text-dark-gray">
            {(ingredients && ingredients.length !== 0) && (
              <p className="text-red">You are missing {ingredients.map(i => i.name).join(', ').replace(/, ([^,]*)$/, ' and $1')}.</p>
            )}
          </div>
          <div>
            {!editingOn && (
              <>
                <div className="flex justify-between font-medium mb-2">
                  <p>&#9200; {recipe.time} min</p>
                  <p>&#128293; {recipe.kcal} kcal</p>
                </div>
                <div>
                  <p>{recipe.summary}</p>
                </div>
              </>
            )}
            {editingOn && (
              <>
                <div>
                  <div className="my-2">
                    <label htmlFor="day">Day: </label>
                    <input 
                      id="day" 
                      className="border border-medium-gray rounded-md outline-none"
                      onChange={e => setDay(e.target.value)}
                    />
                  </div>
                  <div className="my-2">
                    <label htmlFor="meal">Meal: </label>
                    <input 
                      id="meal" 
                      className="border border-medium-gray rounded-md outline-none"
                      onChange={e => setTime(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Check 
                    className="text-dark-gray hover:text-red duration-200 transition cursor-pointer" 
                    strokeWidth={4}
                    onClick={() => {
                      addToPlan()
                      setEditingOn(false)
                    }}
                  />
                  <X 
                    className="text-dark-gray hover:text-red duration-200 transition cursor-pointer"
                    strokeWidth={4}
                    onClick={() => setEditingOn(false)}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
