import React from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Movies } from "../../Data/MovieData";
import FlexMovieItems from "../FlexMovieItems";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import Loader from "../Notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { IfMovieLiked, likeMovie } from "../../Context/Functionalities";

const Swipper = ({ movies }) => {
  const { isLoading } = useSelector((state) => state.userLikeMovie);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const isLiked = (movie) => {
    return IfMovieLiked(movie);
  };

  return (
    <Swiper
      direction="horizontal"
      slidesPerView={1}
      loop={true}
      speed={1000}
      modules={[Autoplay]}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      className="w-full xl:h-screen bg-dry lg:h-64 h-48"
    >
      {movies.slice(0, 5).map((movie, index) => (
        <SwiperSlide key={index} className="relative rounded overflow-hidden">
          <img
            src={movie.image}
            alt={movie.name}
            className="w-full h-full object-cover"
          ></img>
          <div className="absolute linear-bg xl:pl-20 sm:pl-32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-14 md:gap-5 gap-4">
            <h1 className="xl:text-5xl truncate font-sans sm:text-2xl text-2xl font-bold uppercase">
              {movie.name}
            </h1>
            <div className="flex gap-5 items-center text-dryGray">
              <FlexMovieItems movie={movie} />
            </div>
            <div className="flex gap-5 items-center">
              <Link
                to={`/movie/${movie?._id}`}
                className="bg-subMain hover:text-main transitions text-white px-8 py-3 rounded font-medium sm:text-sm text-xs"
              >
                Watch
              </Link>
              <button
                onClick={() => likeMovie(movie, dispatch, userInfo)}
                disabled={isLiked(movie) || isLoading}
                className={`bg-white
                  ${isLiked(movie) ? "text-subMain" : "text-white"}
                   hover:text-subMain transitions px-4 py-3 rounded text-sm bg-opacity-30`}
              >
                <FaHeart />
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

function Banner({ movies, isLoading }) {
  return (
    <div className="relative w-full">
      {isLoading ? (
        <div className="w-full flex-colo xl:h-96 bg-dry lg:h-64 h-48">
          <Loader />
        </div>
      ) : movies?.length > 0 ? (
        <Swipper movies={movies} />
      ) : (
        <div className="w-full flex-colo xl:h-96 bg-dry lg:h-64 h-48">
          <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">
            It seem's like we dont have any movie
          </p>
        </div>
      )}
    </div>
  );
}

export default Banner;
