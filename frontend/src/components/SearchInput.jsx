import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const SearchInput = () => {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  const handleSearchChange = (e) => {
    setKeyword(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search?keyword=${keyword.trim()}`)
    }
  }

  return (
    <form className="w-full relative" onSubmit={handleSearchSubmit}>
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        value={keyword}
        onChange={handleSearchChange}
        type="search"
        id="default-search"
        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-emerald-400 focus:border-emerald-400"
        placeholder="输入商品名称或描述"
        required
      />
      <button
        type="submit"
        className="text-white absolute end-2.5 bottom-2.5 bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-4 py-2">
        搜索
      </button>
    </form>
  )
}

export default SearchInput
