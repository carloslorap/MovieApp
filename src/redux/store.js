import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as User from "./Reducers/userReducers";
import * as Categories from "./Reducers/categoriesReducer";
import * as Movies from "./Reducers/moviesReducer";

const rootReducer = combineReducers({
  //user reducers
  userLogin: User.userLoginReducer,
  userRegister: User.userRegisterReducer,
  userUpdateProfile:User.userUpdateProfileReducer,
  userDeleteProfile: User.userDeleteProfileReducer,
  userChangePassword: User.userChangePasswordReducer,
  userGetFavorite:User.userGetFavoriteMoviesReducer,
  userDeleteFavorite:User.userDeleteFavoriteMoviesReducer,
  adminGetAllUsers:User.adminGetAllUsersReducer,
  adminDeleteUser:User.adminDeleteUserReducer,
  userLikeMovie:User.userLikeMovieReducer,

  //categories reducers
  categoryAll:Categories.getAllCategoriesReducer,
  categoryCreate:Categories.createCategoriesReducer,
  categoryUpdate:Categories.updateCategoriesReducer, 
  categoryDelete:Categories.deleteCategoriesReducer,

  //movies reducers
  getAllMovies: Movies.moviesListReducer,
  getRandomMovies:Movies.moviesRandomReducer,
  getMovieById:Movies.moviesDetailsReducer,
  getTopRatedMovies:Movies.moviesTopRatedReducer,
  createReview:Movies.createReviewReducer,
  deleteMovie:Movies.deleteMovieReducer,
  deleteAllMovies:Movies.deleteAllMoviesReducer,
  createMovie:Movies.createMoviesReducer,
  DeleteEditAddResetCasts:Movies.castsMoviesReducer,
  updateMovie:Movies.updateMovieReducer,


});

//get userInfo from localstorage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

//initialState
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});
