import axios from 'axios'
import { React, useState, useEffect } from 'react'
import { WithContext as ReactTags } from 'react-tag-input'
import { Filter } from 'react-feather'

import Navbar from './Navbar'
import MealPlanCard from './MealPlanCard'

const MealPlanning = () => {
  const [plan, setPlan] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  const times = ['breakfast', 'lunch', 'dinner', 'other']

  useEffect(() => {
    const intervalID = setInterval(() => {
        // const checkLoggedIn = async () => {
        //   const { data } = await axios.get('/account/isLoggedIn')
        //   setLoggedIn(data?true:false)
        // }
        const getPlan = async () => {
          const { data } = await axios.get('/api/plan')
          setPlan(data.plan)
          //data.plan.monday.breakfast.map(meal => console.log(meal))
        }
        //checkLoggedIn()
        getPlan()
      }, 1000)
    return () => clearInterval(intervalID)
  }, [])
  
  const view = () => {
    //plan.monday.breakfast.map(meal => console.log(meal.title))
    daysOfWeek.map(day => {
      times.map(time => {
        plan[day][time].map(recipe => console.log(recipe.title))
      })
    })
  }
  
  return (
    <>
      <div className="flex flex-col justify-start w-full h-full bg-light-gray rounded-3xl p-12">
        <Navbar page="planning" />
        <div className="overflow-y-scroll">
          <div className="grid grid-cols-7 gap-2">
            {daysOfWeek.map(day => (
              <div className="col-span-1" key={day}> 
                <h2 className="text-red font-bold text-center">{day.charAt(0).toUpperCase() + day.slice(1)}</h2> 
                {times.map(time => (
                  <div className="text-center font-bold">
                    <h3>{time.charAt(0).toUpperCase() + time.slice(1)}</h3>
                    {(plan[day] && plan[day][time]) && (
                      <div>
                        {plan[day][time].map(meal => 
                          <MealPlanCard 
                            mealId={meal.mealId}
                            title={meal.title}
                            image={meal.image}
                          />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>            
            ))}
          </div>  
        </div>
        <button onClick={() => view()}>Click</button>
      </div>
    </>
  )
}

export default MealPlanning
