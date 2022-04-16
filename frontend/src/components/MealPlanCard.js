import axios from 'axios'
import { React } from 'react'
import { X } from 'react-feather'
import { useNavigate, createSearchParams, generatePath } from 'react-router-dom'

const MealPlanCard = ({
  mealId, title, image, day, time,
}) => {
  const params = { id: mealId }

  const navigate = useNavigate()
  const goToRecipe = () => {
    const path = generatePath(':url?:queryString', {
      url: '/recipes',
      queryString: createSearchParams(params).toString(),
    })
    navigate(path)
  }

  const deleteRecipe = async () => {
    await axios.post('/api/plan/delete', {
      mealId, title, image, day, time,
    })
      .then(response => {
        if (response.data !== 'User has successfully deleted recipe from plan.') {
          window.alert(response.data)
        }
      }, error => {
        window.alert(error)
      })
  }

  return (
    <div className="relative rounded-xl h-fit my-2 hover:drop-shadow-md transition duration-200">
      <X
        className="top-0 right-0 absolute text-red cursor-pointer m-2 hover:text-dark-gray duration-200 transition"
        strokeWidth={6}
        height={16}
        width={16}
        onClick={() => deleteRecipe()}
      />
      <div className="h-[100px]">
        <div className={`w-full h-full rounded-t-xl bg-[url(${image})] bg-cover bg-center bg-no-repeat`} />
      </div>
      <div className="h-1/2 rounded-b-xl bg-white" onClick={() => goToRecipe()}>
        <h3 className="p-2 font-base font-normal">{title}</h3>
      </div>
    </div>
  )
}

export default MealPlanCard
