import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import Filter from "../Components/Filter";

import Movie from "../Components/Movie";

import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getAllMoviesAction } from "../redux/Actions/moviesActions";
import Loader from "../Components/Notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import {TbPlayerTrackNext, TbPlayerTrackPrev} from 'react-icons/tb'

const MoviesPage = () => {
  const dispatch = useDispatch();
  const {search}= useParams();
  const sameClass = "w-full gap-6 flex-colo min-h-screen";

  //all movies
  const { isLoading, isError, movies, page, pages } = useSelector(
    (state) => state.getAllMovies
  );
  //get all categories
  const { categories } = useSelector((state) => state.categoryAll);

  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }
    //get all movies (en esta parte si quieres le pones dento del parentesis el "movies" dentro de la funcion o poner solo unas llaves "{}" para que te traiga todas las peliculas q tienes en tu database)
    dispatch(getAllMoviesAction({}))
  }, [dispatch, isError]);

const nextPage =()=>{
  dispatch(getAllMoviesAction({
    pageNumber:page +1
  }))
}

const prevPage =()=>{
  dispatch(getAllMoviesAction({
    pageNumber:page -1
  }))
}
  
  console.log(search)
  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Filter categories={categories} />
        <p className="text-lg font-medium my-6">
          Total <span className="font-bold text-subMain">{movies ? movies?.length: 0}</span>
          {""} items Found {search && `for "${search}"`}
        </p>
        {isLoading ? (
          <div className={sameClass}>
            <Loader />
          </div>
        ) : movies?.length > 0 ? (
          <>
            <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
              {movies.map((movie, index) => (
                <Movie key={index} movie={movie}/>
              ))}
            </div>
            {/* loadind more */}

            <div className="w-full flex-rows gap-6 md:my-20 my-10 ">
                  <button onClick={prevPage} disabled={page === 1} className="text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:bg-subMain">
                    <TbPlayerTrackPrev className="text-xl"/>
                  </button>

                  <button onClick={nextPage} disabled={page === pages} className="text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:bg-subMain">
                    <TbPlayerTrackNext className="text-xl"/>
                  </button>
            </div>
          </>
        ) : (
          <div className={sameClass}>
            <div className="w-24 h-24 p-5 rounded-full mb-4 bg-dry text-subMain text-4xl flex-colo">
              <RiMovie2Line />
            </div>
            <p className="text-border text-sm">
              It seem's like we dont have any movie
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MoviesPage;
