import React, { useEffect } from "react";
import SideBar from "./SideBar";
import Table from "../../Components/Table";
//import { Movies } from "../../Data/MovieData";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavoriteMovieAction, getFavoriteMovieAction } from "../../redux/Actions/userActions";
import toast from "react-hot-toast";
import Loader from "../../Components/Notifications/Loader";
import { Empty } from "../../Components/Notifications/Empty";

const FavoritesMovies = () => {
  const dispatch = useDispatch();

  const { isLoading, isError, linkedMovies } = useSelector(
    (state) => state.userGetFavorite
  );
  //DELETE
  const {
    isLoading: deleteMovieLoading,
    isError: deleteMovieError,
    isSuccess,
  } = useSelector((state) => state.userDeleteFavorite);


  //delete movies Handler
  const deleteMovieshandler =()=>{
    window.confirm("Are you sure you want to delete all movies?");
    dispatch(deleteFavoriteMovieAction())
  }


  useEffect(() => {
    dispatch(getFavoriteMovieAction());
    if (isError || deleteMovieError) {
      toast.error(isError || deleteMovieError);
      dispatch({ type:isError ? "GET_FAVORITE_MOVIE_RESET" : "DELETE_FAVORITE_MOVIE_RESET" });
    }
  }, [dispatch, isError,deleteMovieError,isSuccess]);
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Favorities Movies</h2>

          {
            linkedMovies?.length > 0 &&
            <button disabled={deleteMovieError}
            onClick={deleteMovieshandler}
             className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded">
            {
              deleteMovieLoading ? "Loading..." : "Delete All"
            }
         
          </button>
          }
          
        </div>

        {isLoading ? (
          <Loader />
        ) : linkedMovies.length > 0 ? (
          <Table data={linkedMovies} admin={false} />
        ) : (
          <Empty message={"You have no favorites movies"}/>
        )}
      </div>
    </SideBar>
  );
};

export default FavoritesMovies;
