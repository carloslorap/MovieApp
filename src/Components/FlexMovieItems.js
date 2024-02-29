import React from 'react'
import {FaRegCalendarAlt} from 'react-icons/fa'
import {BiTime}from 'react-icons/bi'

const FlexMovieItems = ({movie}) => {
  return (
   <>
    <div className='flex items-center gap-2'>
        <span className='text-lg font-medium'>{movie.category}</span>
    </div>
    <div className='flex items-center gap-2'>
        <FaRegCalendarAlt className='text-subMain w-3 h-3'/>
        <span className='text-lg font-medium'>{movie.year}</span>
    </div>
    <div className='flex items-center gap-2'>
        <BiTime className='text-subMain w-3 h-3'/>
        <span className='text-lg font-medium'>{movie.time} hours</span>
    </div>
   </>
  )
}

export default FlexMovieItems