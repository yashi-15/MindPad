import React from 'react'

const ToggleButton = ({lightMode, setLightMode}) => {
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={()=> setLightMode(!lightMode)}
        className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
          lightMode ? "bg-gray-500" : "bg-gray-500"
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            lightMode ? "translate-x-6" : ""
          }`}
        ></span>
      </button>
    </div>
  )
}

export default ToggleButton
