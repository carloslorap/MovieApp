import * as userContants from "../Constants/userContants";

//LOGIN
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case userContants.USER_LOGIN_REQUEST:
      return { isLoading: true };
    case userContants.USER_LOGIN_SUCCESS:
      return { isLoading: false, userInfo: action.payload, isSuccess: true };
    case userContants.USER_LOGIN_FAIL:
      return { isLoading: false, isError: action.payload };
    case userContants.USER_LOGIN_RESET:
      return {};
    case userContants.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

//REGISTER
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case userContants.USER_REGISTER_REQUEST:
      return { isLoading: true };
    case userContants.USER_REGISTER_SUCCESS:
      return { isLoading: false, userInfo: action.payload, isSuccess: true };
    case userContants.USER_REGISTER_FAIL:
      return { isLoading: false, isError: action.payload };
    case userContants.USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

//UPDATE PROFILE
export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case userContants.USER_UPDATE_PROFILE_REQUEST:
      return { isLoading: true };
    case userContants.USER_UPDATE_PROFILE_SUCCESS:
      return { isLoading: false, userInfo: action.payload, isSuccess: true };
    case userContants.USER_UPDATE_PROFILE_FAIL:
      return { isLoading: false, isError: action.payload };
    case userContants.USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

//DELETE PROFILE
export const userDeleteProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case userContants.USER_DELETE_PROFILE_REQUEST:
      return { isLoading: true };
    case userContants.USER_DELETE_PROFILE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case userContants.USER_DELETE_PROFILE_FAIL:
      return { isLoading: false, isError: action.payload };
    case userContants.USER_DELETE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

//CHANGE PASSWORD
export const userChangePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case userContants.USER_CHANGE_PASSWORD_REQUEST:
      return { isLoading: true };
    case userContants.USER_CHANGE_PASSWORD_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        message: action.payload.message,
      };
    case userContants.USER_CHANGE_PASSWORD_FAIL:
      return { isLoading: false, isError: action.payload };
    case userContants.USER_CHANGE_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

//GET FAVORITE MOVIES
export const userGetFavoriteMoviesReducer = (
  state = { linkedMovies: [] },
  action
) => {
  switch (action.type) {
    case userContants.GET_FAVORITE_MOVIE_REQUEST:
      return { isLoading: true };
    case userContants.GET_FAVORITE_MOVIE_SUCCESS:
      return { isLoading: false, linkedMovies: action.payload };
    case userContants.GET_FAVORITE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    case userContants.GET_FAVORITE_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};

//DELETE FAVORITES MOVIES
export const userDeleteFavoriteMoviesReducer = (state = {}, action) => {
  switch (action.type) {
    case userContants.DELETE_FAVORITE_MOVIE_REQUEST:
      return { isLoading: true };
    case userContants.DELETE_FAVORITE_MOVIE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case userContants.DELETE_FAVORITE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    case userContants.DELETE_FAVORITE_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};

//USER LIKE MOVIES
export const userLikeMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case userContants.LIKE_MOVIE_REQUEST:
      return { isLoading: true };
    case userContants.LIKE_MOVIE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case userContants.LIKE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    case userContants.LIKE_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};





////// ***** ADMIN (START)*****///////////

//ADMIN GET ALL USERS
export const adminGetAllUsersReducer = (state={users:[]}, action) =>{
  switch (action.type) {
    case userContants.GET_ALL_USERS_REQUEST :
      return { isLoading: true };
    case userContants.GET_ALL_USERS_SUCCESS:
      return { isLoading: false, users:action.payload};
    case userContants.GET_ALL_USERS_FAIL :
      return { isLoading: false, isError: action.payload };
    case userContants.GET_ALL_USERS_RESET:
      return {
        users:[],
      };
    default:
      return state;
  }

}

//ADMIN DELETE USER
export const adminDeleteUserReducer =(state={},action)=>{
  switch (action.type) {
    case userContants.DELETE_USER_REQUEST:
      return { isLoading: true };
    case userContants.DELETE_USER_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case userContants.DELETE_USER_FAIL:
      return { isLoading: false, isError: action.payload };
    case userContants.DELETE_USER_RESET:
      return {};
    default:
      return state;
  }
}

////// ***** ADMIN (END)*****///////////



