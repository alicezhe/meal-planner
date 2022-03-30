import axios from 'axios'
import { React, useState, useEffect } from 'react'
import { WithContext as ReactTags } from 'react-tag-input'
import { Filter } from 'react-feather'

import Navbar from './Navbar'
import RecipeCard from './RecipeCard'

const Home = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([{ id:12345 }, { id:12345 }, { id:12345 }, { id:12345 }, { id:12345 }])
  const [tags, setTags] = useState([])
  const [loggedIn, setLoggedIn] = useState('')

  const apiKey = '93c826ea462347fca104e57df38fcf1b'

  const KeyCodes = {
    comma: 188,
    enter: 13
  }
  
  const delimiters = [KeyCodes.comma, KeyCodes.enter]

  useEffect(() => {
    const intervalID = setInterval(() => {
      const checkLoggedIn = async () => {
        const { data } = await axios.get('/account/isLoggedIn')
        setLoggedIn(data)
      }
      checkLoggedIn()
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  const searchRecipes = async () => {
    // const url = encodeURI(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}&number=1`)
    // const { data } = await axios.get(url)

    // setResults(data.results)
    setResults([{ id:12345 }])
  }

  const searchIngredients = async () => {
    const parsedSearch = tags.map(tag => tag.text).join(',+')
    const url = encodeURI(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${parsedSearch}&apiKey=${apiKey}`)
    const { data } = await axios.get(url)

    setResults(data)
  }

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  }

  const handleAddition = tag => {
    setTags([...tags, tag]);
  }

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  }

  return (
    <>
      <div className="flex flex-col justify-between w-full h-full bg-light-gray rounded-3xl p-12">
        <div className="overflow-y-scroll">
          <div>
            <Navbar loggedIn={loggedIn} />
            <div className="h-[40px] flex items-start mt-4">
              <div className="h-full w-[40px] bg-red text-white flex justify-center items-center rounded-xl inline-block">
                <Filter />
              </div>
              <input 
                className="rounded-xl mx-4 h-full w-[450px] py-2 px-4 outline-1 outline-medium-gray"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search recipes..."
              />
              <button className="rounded-xl bg-medium-gray p-2 h-full" onClick={() => searchRecipes()}>Search</button>
            </div>
          </div>
          {/* <h1> React Tags Example </h1>
          <div>
            <ReactTags
              tags={tags}
              delimiters={delimiters}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              handleDrag={handleDrag}
              inputFieldPosition="bottom"
              autocomplete
            />
            <button onClick={searchIngredients}>Search by ingredients</button>
        </div> */}
          <div className="grid grid-cols-4 gap-8 mt-8">
            {results.map(result => 
              <RecipeCard 
                key={result.id}
                id={result.id}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
