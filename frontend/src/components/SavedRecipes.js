import axios from 'axios'
import { React, useState, useEffect } from 'react'
import { WithContext as ReactTags } from 'react-tag-input'
import { Filter } from 'react-feather'

import Navbar from './Navbar'
import RecipeCard from './RecipeCard'

const SavedRecipes = () => {
  return (
    <>
      <div className="flex flex-col justify-between w-full h-full bg-light-gray rounded-3xl p-12">
        <Navbar title="Saved Recipes"/>
      </div>
    </>
  )
}

export default SavedRecipes
