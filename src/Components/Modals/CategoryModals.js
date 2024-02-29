import React, { useEffect, useState } from "react";
import MainModals from "./MainModals";
import { Input } from "../UsedInputs";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategoriesAction,
  updateCategoriesAction,
} from "../../redux/Actions/categoriesActions";
import toast from "react-hot-toast";

const CategoryModals = ({ modalOpen, setModalOpen, category }) => {
  const dispatch = useDispatch();
  const [title, settitle] = useState("");

  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.categoryCreate
  );
  const {
    isLoading: upLoading,
    isError: upError,
    isSuccess: upSuccess,
  } = useSelector((state) => state.categoryUpdate);

  //create  category handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (title) {
      //si la categoría no está vacía, actualice la categoría; de lo contrario, cree la categoría
      if (category) {
        dispatch(updateCategoriesAction(category?._id, { title: title }));
        setModalOpen(!modalOpen);
      } else {
        dispatch(createCategoriesAction({ title: title }));
        settitle("");
      }
    } else {
      toast.error("Please write a category name");
    }
  };

  useEffect(() => {
    if (upError || isError) {
      toast.error(upError || isError);
      dispatch({
        type:isError ? "CREATE_CATEGORIES_RESET" : "UPDATE_CATEGORIES_RESET"

      })
    }

    if (upSuccess || isSuccess) {
      dispatch({
        type:isError ? "CREATE_CATEGORIES_RESET" : "UPDATE_CATEGORIES_RESET"

      })
    }


    //si la categoría no es nula, establezca el título en el título de la categoría
    if (category) {
      settitle(category?.title)
    }

    //si modal está cerrado, establezca el título en vacío
    if (modalOpen === false) {
        settitle("")
    }


  }, [dispatch,isError,isSuccess,upError,upSuccess,category,modalOpen]);

  return (
    <MainModals modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle bg-main text-white p-10 overflow-y-auto h-full rounded-2xl">
        <h2 className="text-3xl font-bold">{category ? "Update" : "Create"}</h2>
        <form className="flex flex-col gap-6 text-left mt-6" onSubmit={submitHandler}>
          <Input
            label="Category Name"
            placeholder={category ? category.title : "Category Name"}
            type="text"
            bg={false}
            value={title}
            onChange={(e)=>settitle(e.target.value)}
          />
          <button
          disabled={isLoading || upLoading }
            type="submit"
            className="w-full flex-rows gap-4 py-3 rounded bg-subMain text-white"
          >{
            isLoading || upLoading ? "Loading..." : category ? "Update": "Create"
          }
           
          </button>
        </form>
      </div>
    </MainModals>
  );
};

export default CategoryModals;
