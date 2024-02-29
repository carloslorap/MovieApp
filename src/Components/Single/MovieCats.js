import React from 'react'
import { Title } from '../Title'
import { FaUserFriends } from 'react-icons/fa'
import {Swiper, SwiperSlide} from 'swiper/react'
import { Autoplay } from 'swiper'
import { UsersData } from '../../Data/MovieData'

const MovieCats = ({movie}) => {
  return (
    movie?.casts?.length > 0  &&(
<div className='my-12'>
      <Title title="Cats" Icon={FaUserFriends}/>
      <div className='mt-10'>
        <Swiper autoplay={{
          delay:1000,
          disableOnInteraction:false,

        }}loop={true} speed={1000} modules={[Autoplay]}
        spaceBetween={10}
        breakpoints={{
          0:{
            slidesPerView:1,
          
          },
          400:{
            slidesPerView:2,
           
          },
          768:{
            slidesPerView:3,
           
          },
          1024:{
            slidesPerView:4,
           
          },
          1280:{
            slidesPerView:5,
            spaceBetween :30,
          }
        }} >
            {
              movie?.casts?.map((casts)=>(
                <SwiperSlide key={casts?._id}>
                    <div className='w-64 p-3 italic text-xs text-text rounded flex-colo bg-main border border-gray-800'>
                      <img src={casts?.image} alt={casts?.name} className='w-64 h-64 object-cover rounded mb-4'/>
                   <p>{casts?.name}</p>
                    </div>
                </SwiperSlide>
              ))
            }
        </Swiper>
      </div>
    </div>
    )
    
  )
}

export default MovieCats