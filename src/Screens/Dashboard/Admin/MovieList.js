import React, { useEffect } from 'react'
import SideBar from '../SideBar'
import Table from '../../../Components/Table'
import { Movies } from '../../../Data/MovieData'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { deleteAllMoviesAction, deleteMovieAction, getAllMoviesAction } from '../../../redux/Actions/moviesActions'
import Loader from '../../../Components/Notifications/Loader'
import { Empty } from '../../../Components/Notifications/Empty'
import { TbPlayerTrackNext, TbPlayerTrackPrev } from 'react-icons/tb'

export const MovieList = () => {
  const dispatch = useDispatch();

  //all movies
  const { isLoading, isError, movies, page, pages } = useSelector(
    (state) => state.getAllMovies)

  
  //delete movie
  const { isLoading:deleteLoading, isError:deleteError } = useSelector(
    (state) => state.deleteMovie)

    //delete all movies
    const { isLoading:deleteAllLoading, isError:deleteAllError } = useSelector(
      (state) => state.deleteAllMovies)


    //delete movie for id (handler)
    const deleteMovieHandler =(id)=>{
      window.confirm("Are you sure you want do delete this movie?") &&
      dispatch(deleteMovieAction(id))
    }

    //delete all movies (handler)
    const deleteAllMovieHandler =()=>{
      window.confirm("Are you sure you want do delete all movies?") &&
      dispatch(deleteAllMoviesAction())
    }

    useEffect(() => {
      if (isError || deleteError || deleteAllError) {
        toast.error(isError || deleteError || deleteAllError);
      }
      //get all movies
      dispatch(getAllMoviesAction({}))
    }, [dispatch, isError,deleteError,deleteAllError]);


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

  return (
    <SideBar>
        <div className='flex flex-col gap-6'>
                <div className='flex-btn gap-2'>
                    <h2 className='text-xl font-bold'> Movies List</h2>
                    {
                      movies?.length > 0 && 
                      <button
                      disabled={deleteAllLoading}
                      onClick={deleteAllMovieHandler}
                       className='bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded'>
                        {
                          deleteAllLoading ? "Loading..." :"Delete All"
                        }
                
                        </button>

                    }

                </div>
                {isLoading || deleteLoading ? (
          <Loader />
        ) : movies.length > 0 ? (
          <>
          <Table data={movies} admin={true} onDeleteHandler={deleteMovieHandler} />
           {/* loadind more */}
         
           <div className="w-full flex-rows gap-6">
           <button onClick={prevPage} disabled={page === 1} className="text-white p-2 rounded font-semibold border-2 border-subMain hover:bg-subMain">
             <TbPlayerTrackPrev className="text-xl"/>
           </button>

           <button onClick={nextPage} disabled={page === pages} className="text-white p-2 rounded font-semibold border-2 border-subMain hover:bg-subMain">
             <TbPlayerTrackNext className="text-xl"/>
           </button>
         </div>
         </>
        ) : (
          <Empty message={"You have no movies"}/>
        )}
             
        </div>
    </SideBar>
  )
}
