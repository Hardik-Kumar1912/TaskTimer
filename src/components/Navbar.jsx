import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex gap-12 place-content-evenly mb-5 bg-gray-800 h-[45px] justify-center items-center caret-transparent'>
      <NavLink to="/" className={({isActive})=>
        isActive ?
        "text-blue-500 font-semibold text-xl"
        :
        "text-white font-medium text-xl"
      }>
        Home
      </NavLink>

      <NavLink to="/alltasks" className={({isActive})=>
        isActive ?
        "text-blue-500 font-semibold text-xl"
        :
        "text-white font-medium text-xl"
      }>
        All Tasks
      </NavLink>

    </div>
  )
}

export default Navbar
