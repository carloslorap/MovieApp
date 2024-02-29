import * as moviesContants from "../Constants/movieContants";
import * as moviesApi from "../APIS/moviesServices";
import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../Protection";

//get all movies action
export const getAllMoviesAction =
  ({
    category = "",
    time = "",
    language = "",
    rate = "",
    year = "",
    search = "",
    pageNumber = "",
  }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: moviesContants.MOVIES_LIST_REQUEST,
      });
      const response = await moviesApi.getAllMoviesService(
        category,
        time,
        language,
        rate,
        year,
        search,
        pageNumber
      );
      dispatch({
        type: moviesContants.MOVIES_LIST_SUCCESS,
        payload: response,
      });
    } catch (error) {
      ErrorsAction(error, dispatch, moviesContants.MOVIES_LIST_FAIL);
    }
  };

//get random movies action
export const getRandomMoviesAction = () => async (dispatch) => {
  try {
    dispatch({ type: moviesContants.MOVIES_RANDOM_REQUEST });
    const response = await moviesApi.getRandomMoviesService();
    dispatch({
      type: moviesContants.MOVIES_RANDOM_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, moviesContants.MOVIES_RANDOM_FAIL);
  }
};

//get random movies action
export const getMovieByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: moviesContants.MOVIES_DETAILS_REQUEST });
    const response = await moviesApi.getMovieByIdService(id);
    dispatch({
      type: moviesContants.MOVIES_DETAILS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, moviesContants.MOVIES_DETAILS_FAIL);
  }
};

//get random movies action
export const getTopRatedMovieAction = () => async (dispatch) => {
  try {
    dispatch({ type: moviesContants.MOVIES_TOP_RATED_REQUEST });
    const response = await moviesApi.getTopRatedMovieService();
    dispatch({
      type: moviesContants.MOVIES_TOP_RATED_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, moviesContants.MOVIES_TOP_RATED_FAIL);
  }
};

//review movie action
export const reviewMovieAction =
  ({ id, review }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: moviesContants.CREATE_REVIEW_REQUEST });
      const response = await moviesApi.reviewMovieService(
        tokenProtection(getState),
        id,
        review
      );
      dispatch({
        type: moviesContants.CREATE_REVIEW_SUCCESS,
        payload: response,
      });
      toast.success("Review added successfully");
      dispatch({ type: moviesContants.CREATE_REVIEW_RESET });
      dispatch(getMovieByIdAction(id));
    } catch (error) {
      ErrorsAction(error, dispatch, moviesContants.CREATE_REVIEW_FAIL);
    }
  };

//delete movie action
export const deleteMovieAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesContants.DELETE_MOVIE_REQUEST });
    const response = await moviesApi.deleteMovieService(
      tokenProtection(getState),
      id
    );
    dispatch({
      type: moviesContants.DELETE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success("Movie delete successfully");
    dispatch(getAllMoviesAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, moviesContants.DELETE_MOVIE_FAIL);
  }
};

//delete all movies action
export const deleteAllMoviesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesContants.DELETE_ALL_MOVIES_REQUEST });
    const response = await moviesApi.deleteAllMovieService(
      tokenProtection(getState)
    );
    dispatch({
      type: moviesContants.DELETE_ALL_MOVIES_SUCCESS,
      payload: response,
    });
    toast.success("All movies delete successfully");
    dispatch(getAllMoviesAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, moviesContants.DELETE_ALL_MOVIES_FAIL);
  }
};

//create movie action
export const createMovieAction = (movie) => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesContants.CREATE_MOVIE_REQUEST });
    const response = await moviesApi.createMovieService(
      tokenProtection(getState),
      movie
    );
    dispatch({
      type: moviesContants.CREATE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success("Movie created successfully");
    dispatch(deleteAllCastsAction());
  } catch (error) {
    ErrorsAction(error, dispatch, moviesContants.CREATE_MOVIE_FAIL);
  }
};

//update movie action
export const updateMovieAction = (id, movie) => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesContants.UPDATE_MOVIE_REQUEST });
    const response = await moviesApi.updateMovieService(
      tokenProtection(getState),
      id,
      movie
    );
    dispatch({
      type: moviesContants.UPDATE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success("Movie update successfully");
    dispatch(getMovieByIdAction(id));
    dispatch(deleteAllCastsAction());
  } catch (error) {
    ErrorsAction(error, dispatch, moviesContants.UPDATE_MOVIE_FAIL);
  }
};

//add casts
export const addCastsAction = (cast) => async (dispatch, getState) => {
  dispatch({ type: moviesContants.ADD_CAST, payload: cast });
  localStorage.setItem(
    "casts",
    JSON.stringify(getState().DeleteEditAddResetCasts.casts)
  );
};

//add casts
export const removeCastsAction = (id) => async (dispatch, getState) => {
  dispatch({ type: moviesContants.DELETE_CAST, payload: id });
  localStorage.setItem(
    "casts",
    JSON.stringify(getState().DeleteEditAddResetCasts.casts)
  );
};

//add casts
export const updateCastsAction = (cast) => async (dispatch, getState) => {
  dispatch({ type: moviesContants.EDIT_CAST, payload: cast });
  localStorage.setItem(
    "casts",
    JSON.stringify(getState().DeleteEditAddResetCasts.casts)
  );
};

//delete all casts
export const deleteAllCastsAction = () => async (dispatch) => {
  dispatch({ type: moviesContants.RESET_CAST });
  localStorage.removeItem("casts");
};


























