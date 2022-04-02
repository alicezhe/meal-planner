import axios from 'axios'
import { React, useState, useEffect } from 'react'
import { WithContext as ReactTags } from 'react-tag-input'
import { Search } from 'react-feather'
import { Link, useSearchParams } from 'react-router-dom'

import Navbar from './Navbar'
import RecipeCard from './RecipeCard'
import '../styles/TagSearch.css'

const Home = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [tags, setTags] = useState([])
  const [loggedIn, setLoggedIn] = useState('')
  const [byRecipe, setByRecipe] = useState(true)

  const apiKey = '3f220cadbc3646659ca213813545c978'

  const KeyCodes = {
    comma: 188,
    enter: 13
  }
  
  const delimiters = [KeyCodes.comma, KeyCodes.enter]

  useEffect(() => {
    const getRandomRecipes = async () => {
      const url = encodeURI(`https://api.spoonacular.com/recipes/random?number=4&apiKey=${apiKey}`)
      const { data } = await axios.get(url)
      setResults(data.recipes)
    }
    getRandomRecipes()
  }, [])

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

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (byRecipe) {
      searchRecipes() 
    } else {
      searchIngredients()
    }
    setQuery('')
  }

  const searchRecipes = async () => {
    const url = encodeURI(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}&number=4`)
    const { data } = await axios.get(url)

    setResults(data.results)
    //setResults([{ id:12345 }])
  }

  const searchIngredients = async () => {
    const parsedSearch = tags.map(tag => tag.text).join(',+')
    const url = encodeURI(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${parsedSearch}&ranking=2&number=4&apiKey=${apiKey}`)
    const { data } = await axios.get(url)
    setResults(data)
  }

  const searchCuisine = async (cuisine) => {
    const url = encodeURI(`https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&number=4&apiKey=${apiKey}`)
    const { data } = await axios.get(url)
    setResults(data.results)
  }

  const handleDelete = i => setTags(tags.filter((tag, index) => index !== i))

  const handleAddition = tag => setTags([...tags, tag])

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice()
    newTags.splice(currPos, 1)
    newTags.splice(newPos, 0, tag)
    setTags(newTags)
  }

  return (
    <>
      <div className="flex flex-col justify-between w-full h-full bg-light-gray rounded-3xl p-12">
        <div className="scroll-div overflow-y-scroll">
          <div>
            <Navbar loggedIn={loggedIn} page="home" />
            <div className="h-fit lg:flex lg:justify-between mt-4">
              <div className="h-fit flex items-start justify-center">
                <div className="h-[40px] w-[40px] bg-red text-white flex justify-center items-center rounded-xl inline-block cursor-pointer">
                  <Search onClick={() => setByRecipe(!byRecipe)}/>
                </div>
                {byRecipe && (
                  <form onSubmit={handleSubmit} className="flex justify-items-center h-full">
                    <input 
                      className="rounded-xl mx-4 mb-3 h-[40px] w-[450px] py-2 px-4 outline-0"
                      value={query}
                      onChange={e => setQuery(e.target.value)}
                      placeholder="Search recipes..."
                    />
                    <button
                      className="inline rounded-xl bg-medium-gray p-2 h-full hover:bg-red hover:text-white transition duration-300"
                      type="submit"
                    >
                      Search
                    </button>
                  </form>
                )}
                {!byRecipe && (
                  <form onSubmit={handleSubmit} className="flex justify-items-center h-full">
                    <div id="tagSearch" className="inline">
                      <ReactTags
                        tags={tags}
                        delimiters={delimiters}
                        handleDelete={handleDelete}
                        handleAddition={handleAddition}
                        handleDrag={handleDrag}
                        inputFieldPosition="bottom"
                        autocomplete
                        classNames={{
                          tags: 'tagsClass',
                          tagInput: 'tagInputClass',
                          tagInputField: 'tagInputFieldClass',
                          selected: 'selectedClass',
                          tag: 'tagClass',
                          remove: 'removeClass',
                          suggestions: 'suggestionsClass',
                          activeSuggestion: 'activeSuggestionClass',
                          editTagInput: 'editTagInputClass',
                          editTagInputField: 'editTagInputField',
                          clearAll: 'clearAllClass',
                        }}
                        placeholder='Search by ingredients...'
                      />
                    </div>
                    <button
                      className="inline rounded-xl bg-medium-gray p-2 h-full hover:bg-red hover:text-white transition duration-300"
                      type="submit"
                    >
                      Search
                    </button>
                  </form>
                )}
              </div>
              <div className="flex justify-center">
                <div onClick={() => searchCuisine("Chinese")}>
                  <button className="p-2 bg-white rounded-lg mx-1 hover:text-white hover:bg-red duration-200 transition">
                    &#129377; Chinese
                  </button>
                </div>
                <div onClick={() => searchCuisine("Italian")}>
                  <button className="p-2 bg-white rounded-lg mx-1 hover:text-white hover:bg-red duration-200 transition">
                    &#127837; Italian
                  </button>
                </div>
                <div onClick={() => searchCuisine("Japanese")}>
                  <button className="p-2 bg-white rounded-lg mx-1 hover:text-white hover:bg-red duration-200 transition">
                    &#127843; Japanese
                  </button>
                </div>
                <div onClick={() => searchCuisine("Mexican")}>
                  <button className="p-2 bg-white rounded-lg mx-1 hover:text-white hover:bg-red duration-200 transition">
                    &#127790; Mexican
                  </button>
                </div>
                <div onClick={() => searchCuisine("French")}>
                  <button className="p-2 bg-white rounded-lg mx-1 hover:text-white hover:bg-red duration-200 transition">
                    &#129366; French
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
            {results.map(result => 
              <RecipeCard 
                key={result.id}
                id={result.id}
                loggedIn={true}
                ingredients={result.missedIngredients?result.missedIngredients:[]}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
