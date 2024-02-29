import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { HiPlusCircle } from "react-icons/hi";
import Table2 from "../../../Components/Table2";
import CategoryModals from "../../../Components/Modals/CategoryModals";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoriesAction,
  getAllCategoriesAction,
} from "../../../redux/Actions/categoriesActions";
import Loader from "../../../Components/Notifications/Loader";
import { Empty } from "../../../Components/Notifications/Empty";
import toast from "react-hot-toast";

const Categories = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState();
  const dispatch = useDispatch();

  //all categories
  const { categories, isLoading } = useSelector((state) => state.categoryAll);

  //delete categories
  const { isSuccess, isError } = useSelector((state) => state.categoryDelete);
  const adminDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategoriesAction(id));
    }
  };

  const OnEditFunction = (id) => {
    setCategory(id);
    setModalOpen(!modalOpen);
  };
  useEffect(() => {
    //get all categories
    dispatch(getAllCategoriesAction());

    if (isError) {
      toast.error(isError);
      dispatch({
        type: "DELETE_CATEGORIES_RESET",
      });
    }
    if (isSuccess) {
      dispatch({
        type: "DELETE_CATEGORIES_RESET",
      });
    }

    if (modalOpen === false) {
      setCategory();
    }
  }, [modalOpen, dispatch, isSuccess, isError]);
  return (
    <SideBar>
      <CategoryModals
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        category={category}
      />
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold"> Categories</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-subMain flex-rows gap-4 font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded"
          >
            <HiPlusCircle /> Create
          </button>
        </div>

        {isLoading ? (
          <Loader />
        ) : categories?.length > 0 ? (
          <Table2
            data={categories}
            users={false}
            OnEditFunction={OnEditFunction}
            onDeleteFunction={adminDeleteCategory}
          />
        ) : (
          <Empty message={"You have no categories"} />
        )}
      </div>
    </SideBar>
  );
};

export default Categories;
