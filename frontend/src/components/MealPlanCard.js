import axios from 'axios'
import { React, useState, useEffect } from 'react'
import { WithContext as ReactTags } from 'react-tag-input'
import { Filter } from 'react-feather'

import Navbar from './Navbar'
import RecipeCard from './RecipeCard'

const MealPlanCard = ({ mealId, title, image }) => {
  return (
    <div className="rounded-[30px] h-fit my-2">
      <div className="h-[100px]">
        <div className={`w-full h-full rounded-t-lg bg-[url(${image})] bg-cover bg-center bg-no-repeat`}></div>
      </div>
      <div className="h-1/2 rounded-b-lg bg-white">
        <h3 className="p-2 font-base font-normal">{title}</h3>
      </div>
    </div>
  )
}

export default MealPlanCard
