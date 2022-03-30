import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const RecipeCard = ({ id}) => {
  const [recipe, setRecipe] = useState({
    title: 'Apple Cake', 
    image: 'https://spoonacular.com/recipeImages/632485-556x370.jpg',
    summary: '"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."    ',
    kcal: '100',
    time: '45'
  })

  const apiKey = '93c826ea462347fca104e57df38fcf1b'

  useEffect(() => {
    // const loadRecipe = async () => {
    //   const { data } = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${apiKey}`)
    //   const kcal = data.nutrition.nutrients[0].amount
    //   const { title, image, summary, readyInMinutes: time} = data
    //   setRecipe({ title, image, summary, time, kcal })
    // }
    // loadRecipe()
  }, [])

  return (
    <div className="h-[400px] bg-white rounded-[30px]"> 
      <div className={`bg-[url(${recipe.image})] h-1/2 bg-center bg-no-repeat bg-cover rounded-t-[30px]`}></div>
      <div className="w-full h-1/2 p-4">
        <div className="h-2/5">  
          <h3 className="text-red text-xl font-semibold text-center">{recipe.title}</h3>
          <div className="flex justify-between font-medium">
            <p>&#9200; {recipe.time} min</p>
            <p>&#128293; {recipe.kcal} kcal</p>
          </div>
        </div>
        <p className="text-ellipsis overflow-hidden h-3/5">{recipe.summary}</p>
      </div>
    </div>
  )
}

export default RecipeCard
