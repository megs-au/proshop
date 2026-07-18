import { useState } from "react"
import FormContainer from "./formContainer"
import { useParams, useNavigate } from "react-router-dom"

const SearchBox = () => {
  const navigate = useNavigate()
  const { keyword: urlKeyword } = useParams()
  const [keyword, setKeyword] = useState(urlKeyword || '')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      setKeyword('')
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }

  return (
    <form onSubmit={submitHandler} className="flex">
      <input 
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder="Search Products"
        className="mr-sm-2 ml-sm-5 bg-gray-300 rounded-md"
      />
      <button type="submit" className="p-2 mx-2 bg-transparent hover:bg-gray-300 text-gray-300 font-semibold hover:text-gray-700 border border-gray-300 hover:border-transparent rounded">
        Search
      </button>
    </form>
  )
}

export default SearchBox