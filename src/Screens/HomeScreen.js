import React, { useEffect } from 'react'
import Layout from '../Layout/Layout'
import Banner from '../Components/Home/Banner'
import PopularMovies from '../Components/Home/PopularMovies'
import Promos from '../Components/Home/Promos'
import TopRated from '../Components/Home/TopRated'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMoviesAction, getRandomMoviesAction, getTopRatedMovieAction, setIsSongIndexgAction } from '../redux/Actions/moviesActions'
import toast from 'react-hot-toast'

const HomeScreen = ({index}) => {

  const dispatch =useDispatch();

  const { isLoading, isError, movies } = useSelector(
    (state) => state.getAllMovies
  );

  const { isLoading:topLoading, isError:topError, movies:topMovies } = useSelector(
    (state) => state.getTopRatedMovies
  );

  const { isLoading:randomLoading, isError:randomError, movies:randomMovies } = useSelector(
    (state) => state.getRandomMovies
  );


  useEffect(()=>{
    //get random movies
    dispatch(getRandomMoviesAction())

    //get all movies
    dispatch(getAllMoviesAction({}))

    //get top rated movies
    dispatch(getTopRatedMovieAction())

    if (isError || randomError || topError) {
      toast.error("Something went wrong")

    }
 
  },[dispatch,isError,topError,randomError])






  return (
    <Layout>
    <div className='mx-auto min-h-screen mb-6'>
      <Banner movies={movies} isLoading={isLoading}/>
      <div className='container mx-auto min-h-screen px-2 mb-6'>
      <PopularMovies movies={randomMovies} isLoading={randomLoading}/>
      <Promos/>
      <TopRated movies={topMovies} isLoading={topLoading}/>
      </div>
    </div>
    </Layout>
  )
}

export default HomeScreen