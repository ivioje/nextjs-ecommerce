import React from 'react'

const Logo = ({ router }) => {
  return (
    <div onClick={() => router?.push('/')} class="flex items-center space-x-2">
        <span class="text-2xl font-extrabold text-orange-600 tracking-tight">★</span>
        <h1 class="text-2xl font-bold text-gray-800 font-serif">
          <span class="text-orange-600">Star</span><span class="text-gray-800">Boutique</span>
        </h1>
      </div>
  )
}

export default Logo