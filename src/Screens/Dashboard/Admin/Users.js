import React, { useEffect } from 'react'
import SideBar from '../SideBar'

import Table2 from '../../../Components/Table2'

import { useDispatch, useSelector } from 'react-redux'
import { deleteUserAction, getAllusersAction } from '../../../redux/Actions/userActions'
import toast from 'react-hot-toast'
import Loader from "../../../Components/Notifications/Loader";
import { Empty } from '../../../Components/Notifications/Empty'
const Users = () => {


  const dispatch = useDispatch();

  const { isLoading, isError, users } = useSelector(
    (state) => state.adminGetAllUsers
  );
  //DELETE
  const {
    isError: deleteError,
    isSuccess,
  } = useSelector((state) => state.adminDeleteUser);


  //delete user Handler
  const deleteUserhandler =(id)=>{
   if (window.confirm("Are you sure you want to delete this user?")) {
    dispatch(deleteUserAction(id))
   }
  }


  useEffect(() => {
    dispatch(getAllusersAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({ type:isError ? "GET_ALL_USERS_RESET" : "DELETE_USER_RESET" });
    }
  }, [dispatch, isError,deleteError,isSuccess]);





  return (
    <SideBar>
    <div className='flex flex-col gap-6'>
            <div className='flex-btn gap-2'>
                <h2 className='text-xl font-bold'> Users</h2>
              
            </div>

            {isLoading ? (
          <Loader/>
        ) : users?.length > 0 ? (
          <Table2 data={users} users={true} onDeleteFunction={deleteUserhandler}/>
        ) : (
          <Empty message={"You dont have any user"}/>
        )}


    </div>
</SideBar>
  )
}

export default Users