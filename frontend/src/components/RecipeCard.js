import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'
import { Bookmark, Edit2, Check, X } from 'react-feather'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { set } from 'express/lib/application'

const RecipeCard = ({ id, loggedIn, ingredients }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const times = ['Breakfast', 'Lunch', 'Dinner', 'Other']

  const [recipe, setRecipe] = useState({})
  const [recipeSaved, setRecipeSaved] = useState(false)
  const [editingOn, setEditingOn] = useState(false)
  const [selectedDay, setSelectedDay] = useState(days[0])
  const [selectedTime, setSelectedTime] = useState(times[0])

  const apiKey = '93c826ea462347fca104e57df38fcf1b'

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
    await axios.post('/api/plan/add', { id, title:recipe.title, image:recipe.image, day: selectedDay, time: selectedTime })
    .then((response) => {
      if (response.data !== 'User has successfully added recipe to plan.') {
        window.alert(response.data)
      }
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
                  <form>
                      
                  </form>
                  <div className="my-2">
                    <label htmlFor="day">Day: </label>
                    <select 
                      id="day" 
                      className="outline-0"
                      value={selectedDay}
                      onChange={e => setSelectedDay(e.target.value)}>
                      {days.map(day => (
                        <option key={day} value={`${day.toLowerCase()}`}>{day}</option>
                      ))}
                    </select>
                  </div>
                  <div className="my-2">
                    <label htmlFor="time">Time: </label>
                    <select 
                      id="time" 
                      className="outline-0"
                      value={selectedTime}
                      onChange={e => setSelectedTime(e.target.value)}>
                      {times.map(time => (
                        <option key={time} value={`${time.toLowerCase()}`}>{time}</option>
                      ))}
                    </select>
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
