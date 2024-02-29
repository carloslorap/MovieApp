import * as categoriesContants from "../Constants/categoriesContants";
import * as categoriesApi from "../APIS/categoriesServices";
import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../Protection";

// get all categories action
export const getAllCategoriesAction = () => async (dispatch) => {
  try {
    dispatch({ type: categoriesContants.GET_ALL_CATEGORIES_REQUEST });
    const data = await categoriesApi.getCategorieServices();
    dispatch({
      type: categoriesContants.GET_ALL_CATEGORIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, categoriesContants.GET_ALL_CATEGORIES_FAIL);
  }
};

// create category action
export const createCategoriesAction = (title) => async (dispatch, getState) => {
  try {
    dispatch({ type: categoriesContants.CREATE_CATEGORIES_REQUEST });
    await categoriesApi.createCategoryService(title, tokenProtection(getState));
    dispatch({ type: categoriesContants.CREATE_CATEGORIES_SUCCESS });
    toast.success("Category created successfully");
  } catch (error) {
    ErrorsAction(error, dispatch, categoriesContants.CREATE_CATEGORIES_FAIL);
  }
};

// update category action
export const updateCategoriesAction = (id, title) => async (dispatch, getState) => {
    try {
      dispatch({ type: categoriesContants.UPDATE_CATEGORIES_REQUEST });
      await categoriesApi.updateCategoryService(
        id,
        title,
        tokenProtection(getState)
      );
      dispatch({ type: categoriesContants.UPDATE_CATEGORIES_SUCCESS });
      toast.success("Category update successfully");
    } catch (error) {
      ErrorsAction(error, dispatch, categoriesContants.UPDATE_CATEGORIES_FAIL);
    }
  };

// delete category action
export const deleteCategoriesAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: categoriesContants.DELETE_CATEGORIES_REQUEST });
    await categoriesApi.deleteCategoryService(id, tokenProtection(getState));
    dispatch({ type: categoriesContants.DELETE_CATEGORIES_SUCCESS });
    toast.success("Category delete successfully");
  } catch (error) {
    ErrorsAction(error, dispatch, categoriesContants.DELETE_CATEGORIES_FAIL);
  }
};


// export const getAllMoviesAction = () => async (dispatch) => {
//   try {
//     dispatch({ type: moviesContants.GET_ALL_MOVIE_REQUEST });
//     const data = await moviesApi.getMovieServices();
//     dispatch({
//       type: moviesContants.GET_ALL_MOVIE_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     ErrorsAction(error, dispatch, moviesContants.GET_ALL_MOVIE_FAIL);
//   }
// };
