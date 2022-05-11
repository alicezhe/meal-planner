import { React, useState } from 'react'
import axios from 'axios'
import { Check, X } from 'react-feather'

const MealPlanForm = ({
  setEditingOn, id, title, image, canCancel,
}) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const times = ['Breakfast', 'Lunch', 'Dinner', 'Other']

  const [selectedDay, setSelectedDay] = useState(days[0])
  const [selectedTime, setSelectedTime] = useState(times[0])

  const addToPlan = async () => {
    await axios.post('/api/plan/add', {
      id, title, image, day: selectedDay, time: selectedTime,
    })
      .then(response => {
        if (response.data !== 'User has successfully added recipe to plan.') {
          window.alert(response.data)
        } else {
          window.alert("Meal added!")
        }
      }, error => {
        window.alert(error)
      })
  }

  return (
    <>
      <div>
        <div className="my-2">
          <label htmlFor="day" className="font-bold">Day: </label>
          <select
            id="day"
            className="outline-0"
            value={selectedDay}
            onChange={e => setSelectedDay(e.target.value)}
          >
            {days.map(day => (
              <option key={day} value={`${day.toLowerCase()}`}>{day}</option>
            ))}
          </select>
        </div>
        <div className="my-2">
          <label htmlFor="time" className="font-bold">Time: </label>
          <select
            id="time"
            className="outline-0"
            value={selectedTime}
            onChange={e => setSelectedTime(e.target.value)}
          >
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
            if (canCancel) {
              setEditingOn(false)
            }
          }}
        />
        {canCancel && (
          <X
            className="text-dark-gray hover:text-red duration-200 transition cursor-pointer"
            strokeWidth={4}
            onClick={() => setEditingOn(false)}
          />
        )}
      </div>
    </>
  )
}

export default MealPlanForm
