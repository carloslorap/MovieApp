import * as categoriesContants from "../Constants/categoriesContants";

//GET ALL CATEGORIES
export const getAllCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case categoriesContants.GET_ALL_CATEGORIES_REQUEST:
      return { isLoading: true };
    case categoriesContants.GET_ALL_CATEGORIES_SUCCESS:
      return { isLoading: false, categories: action.payload };
    case categoriesContants.GET_ALL_CATEGORIES_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

//CREATE CATEGORY
export const createCategoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case categoriesContants.CREATE_CATEGORIES_REQUEST:
      return { isLoading: true };
    case categoriesContants.CREATE_CATEGORIES_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case categoriesContants.CREATE_CATEGORIES_FAIL:
      return { isLoading: false, isError: action.payload };
    case categoriesContants.CREATE_CATEGORIES_RESET:
      return {};
    default:
      return state;
  }
};

//UPDATE CATEGORY
export const updateCategoriesReducer = (state = {}, action) => {
    switch (action.type) {
      case categoriesContants.UPDATE_CATEGORIES_REQUEST:
        return { isLoading: true };
      case categoriesContants.UPDATE_CATEGORIES_SUCCESS:
        return { isLoading: false, isSuccess: true };
      case categoriesContants.UPDATE_CATEGORIES_FAIL:
        return { isLoading: false, isError: action.payload };
      case categoriesContants.UPDATE_CATEGORIES_RESET:
        return {};
      default:
        return state;
    }
  };

//DELETE CATEGORY
export const deleteCategoriesReducer = (state = {}, action) => {
    switch (action.type) {
      case categoriesContants.DELETE_CATEGORIES_REQUEST:
        return { isLoading: true };
      case categoriesContants.DELETE_CATEGORIES_SUCCESS:
        return { isLoading: false, isSuccess: true };
      case categoriesContants.DELETE_CATEGORIES_FAIL:
        return { isLoading: false, isError: action.payload };
      case categoriesContants.DELETE_CATEGORIES_RESET:
        return {};
      default:
        return state;
    }
  };

