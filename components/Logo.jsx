import React from 'react'

const Logo = ({ router }) => {
  return (
    <div onClick={() => router?.push('/')} className="flex items-center space-x-2 cursor-pointer">
        <span className="text-2xl font-extrabold text-gray-600 tracking-tight">★</span>
        <h1 className="text-2xl font-bold text-gray-800 font-serif">
          <span className="text-gray-600">Star</span><span className="text-gray-800">Boutique</span>
        </h1>
      </div>
  )
}

export default Logo