import * as userContants from "../Constants/userContants";
import * as userApi from "../APIS/userServices";
import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../Protection";

//login action
const loginAction = (datas) => async (dispatch) => {
  try {
    dispatch({ type: userContants.USER_LOGIN_REQUEST });
    const response = await userApi.loginService(datas);
    dispatch({ type: userContants.USER_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, userContants.USER_LOGIN_FAIL);
  }
};

//register action
const registerAction = (datas) => async (dispatch) => {
  try {
    dispatch({ type: userContants.USER_REGISTER_REQUEST });
    const response = await userApi.registerService(datas);
    dispatch({ type: userContants.USER_REGISTER_SUCCESS, payload: response });
    dispatch({ type: userContants.USER_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, userContants.USER_REGISTER_FAIL);
  }
};

//logout action
const logoutAction = () => (dispatch) => {
  userApi.logoutService();
  dispatch({ type: userContants.USER_LOGOUT });
  dispatch({ type: userContants.USER_LOGIN_RESET });
  dispatch({ type: userContants.USER_REGISTER_RESET });
  dispatch({ type: userContants.GET_FAVORITE_MOVIE_RESET });
};

//update profile action
const updateProfileAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: userContants.USER_UPDATE_PROFILE_REQUEST });
    const response = await userApi.updateProfileService(
      user,
      tokenProtection(getState)
    );
    dispatch({
      type: userContants.USER_UPDATE_PROFILE_SUCCESS,
      payload: response,
    });
    toast.success("Profile updated successfully");
    dispatch({ type: userContants.USER_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, userContants.USER_UPDATE_PROFILE_FAIL);
  }
};

//delete profile action
const deleteProfileAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userContants.USER_DELETE_PROFILE_REQUEST });
    await userApi.deleteProfileService(tokenProtection(getState));
    dispatch({
      type: userContants.USER_DELETE_PROFILE_SUCCESS,
    });
    toast.success("Profile deleted");
    dispatch(logoutAction());
  } catch (error) {
    ErrorsAction(error, dispatch, userContants.USER_DELETE_PROFILE_FAIL);
  }
};

//change password action
const changePasswordAction = (passwords) => async (dispatch, getState) => {
  try {
    dispatch({ type: userContants.USER_CHANGE_PASSWORD_REQUEST });
    const response = await userApi.changePasswordService(
      passwords,
      tokenProtection(getState)
    );
    dispatch({
      type: userContants.USER_CHANGE_PASSWORD_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userContants.USER_CHANGE_PASSWORD_FAIL);
  }
};

// get all favorite movie action
const getFavoriteMovieAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userContants.GET_FAVORITE_MOVIE_REQUEST });
    const response = await userApi.getFavoritesMoviesService(
      tokenProtection(getState)
    );
    dispatch({
      type: userContants.GET_FAVORITE_MOVIE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userContants.GET_FAVORITE_MOVIE_FAIL);
  }
};

// delete all favorite movie action
const deleteFavoriteMovieAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userContants.DELETE_FAVORITE_MOVIE_REQUEST });
    await userApi.deleteFavoritesMoviesService(
      tokenProtection(getState)
    );
    dispatch({
      type: userContants.DELETE_FAVORITE_MOVIE_SUCCESS
    });
    toast.success("Favorite movie deleted")
  } catch (error) {
    ErrorsAction(error, dispatch, userContants.DELETE_FAVORITE_MOVIE_FAIL);
  }
};

// user like movie action
const likeMovieAction = (movieId) => async (dispatch, getState) => {
  try {
    dispatch({ type: userContants.LIKE_MOVIE_REQUEST });
    const response = await userApi.likeMovieService(
      movieId,
      tokenProtection(getState)
    );
    dispatch({
      type: userContants.LIKE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success("Added to your favorites")
    dispatch(getFavoriteMovieAction())
  } catch (error) {
    ErrorsAction(error, dispatch, userContants.LIKE_MOVIE_FAIL);
  }
};





////// ***** ADMIN (START)*****///////////

//admin get all users action
const getAllusersAction =()=>async(dispatch,getState)=>{
  try {
    dispatch({ type: userContants.GET_ALL_USERS_REQUEST });
    const response = await userApi.getAlluserService(
      tokenProtection(getState)
    );
    dispatch({
      type: userContants.GET_ALL_USERS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userContants.GET_ALL_USERS_FAIL);
  }
}

//admin delete user action
const deleteUserAction = (id)=>async(dispatch,getState)=>{
  try {
    dispatch({type:userContants.DELETE_USER_REQUEST});
    await userApi.deleteUserService(id,tokenProtection(getState));
    dispatch({
      type: userContants.DELETE_USER_SUCCESS,
    })
    toast.success("User deleted")
  } catch (error) {
    ErrorsAction(error, dispatch, userContants.DELETE_USER_FAIL);
  }
}

////// ***** ADMIN (END)*****///////////

export {
  loginAction,
  registerAction,
  logoutAction,
  updateProfileAction,
  deleteProfileAction,
  changePasswordAction,
  getFavoriteMovieAction,
  deleteFavoriteMovieAction,   
  getAllusersAction, 
  deleteUserAction,
  likeMovieAction
};
