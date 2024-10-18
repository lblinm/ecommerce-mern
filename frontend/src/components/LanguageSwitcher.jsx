import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative inline-block">
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="text-gray-300 bg-transparent hover:text-text-emerald-400 focus:outline-none font-medium rounded-lg text-sm py-2.5 text-center inline-flex items-center"
        type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
        {i18n.language === 'zh' ? '中文' : 'English'}{' '}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id="dropdown"
          className="absolute right-0 z-10 mt-2 bg-gray-700 divide-y divide-gray-100 rounded-lg shadow w-30">
          <ul
            className="py-2 text-sm text-slate-20"
            aria-labelledby="dropdownDefaultButton">
            <li>
              <button
                onClick={() => i18n.changeLanguage('zh')}
                className="block px-4 py-2">
                中文
              </button>
            </li>
            <li>
              <button
                onClick={() => i18n.changeLanguage('en')}
                className="block px-4 py-2">
                English
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
