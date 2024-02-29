import React from 'react'
import { useState } from 'react'
import { Title } from '../Title'
import { BsBookmarkStarFill,  BsCaretLeftFill,  BsCaretRightFill } from 'react-icons/bs'
import {Swiper, SwiperSlide} from 'swiper/react'
import{Autoplay, Navigation } from 'swiper'

import {FaHeart} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Rating from '../Stars'
import Loader from '../Notifications/Loader'
import { Empty } from '../Notifications/Empty'
import { useDispatch, useSelector } from 'react-redux'
import { IfMovieLiked, likeMovie } from '../../Context/Functionalities'



const SwiperTop =({nextEl,prevEl,movies})=>{

  const { isLoading } = useSelector((state) => state.userLikeMovie);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const isLiked = (movie) => {
    return IfMovieLiked(movie);
  };


  return(
    <Swiper 
    navigation={{nextEl,prevEl}}

      autoplay={true} 
      speed={1000} 
      loop={true} 
      modules={[Navigation,Autoplay]}
      breakpoints={{
        0:{
          slidesPerView:1,
          spaceBetween:10
        },
        
        768:{
          slidesPerView:2,
          spaceBetween:20
         
        },
        1024:{
          slidesPerView:3,
          spaceBetween:30
        },
        1280:{
          slidesPerView:4,
          spaceBetween :40,
        }
      }}
      >
      {
        movies.map((movie,index)=>( 
          <SwiperSlide >
              <div key={index} className='p-4 h-rate hovered border border-dry bg-dry rounded-lg overflow-hidden'>
              <img src={movie.image} alt={movie.name} className='w-full h-full object-cover rounded-lg '/>
              <div className='flex flex-col justify-center items-center hoveres px-4 gap-6 text-center absolute bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0 '>
                <button 
                onClick={() => likeMovie(movie, dispatch, userInfo)}
                disabled={isLiked(movie) || isLoading}
                className={`w-12 h-12 flex-colo 
                ${isLiked(movie) ? "bg-subMain" : "bg-white bg-opacity-30"}
                transitions hover:bg-subMain rounded-full text-white`}>
                  <FaHeart/>
                </button>
                 <Link className='font-semibold  text-xl trancuted line-clamp-1' to={`/movie/${movie._id}`}>{movie.name}</Link>
                <div className='flex gap-2 text-start'>
                  <Rating value={movie.rate}/>
                </div>
              </div>
              </div>
          </SwiperSlide>
        ))
      }
    </Swiper>
  )
}




const TopRated = ({movies,isLoading}) => {
  const [nextEl,setNextEl]=useState(null)
  const [prevEl,setPrevEl]=useState(null)
  const classNames="hover:bg-dry transitions text-sm rounded w-8 h-8 flex-colo bg-subMain text-white"
  return (
    <div className='my-16'>
      <Title title="Top Rated" Icon={BsBookmarkStarFill}/>
      <div className='mt-10'>
        {
          isLoading ? <Loader/> :
          movies?.length > 0 ?
          <SwiperTop nextEl={nextEl} prevEl={prevEl} movies={movies}/> 
          :
          <Empty message={"It seem's like we dont have any movie"}/>
        }
        
        <div className='w-full px-1 flex-rows gap-6 pt-12'>
          <button className={classNames} ref={(node)=>setPrevEl(node)}>
              <BsCaretLeftFill/>
          </button>
          <button className={classNames} ref={(node)=>setNextEl(node)}>
              <BsCaretRightFill/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TopRated