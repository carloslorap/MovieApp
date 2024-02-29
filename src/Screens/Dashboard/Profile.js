import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Uploader from "../../Components/Uploader";
import { Input } from "../../Components/UsedInputs";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProfileValidation } from "../../Components/Validation/UserValidation";
import { InlineError } from "../../Components/Notifications/Error";
import { Imagepreview } from "../../Components/Imagepreview";
import { deleteProfileAction, updateProfileAction } from "../../redux/Actions/userActions";
import toast from "react-hot-toast";

const Profile = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);

  const [imageUrl, setimageUrl] = useState(userInfo ? userInfo.image : "");

  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.userUpdateProfile
  );

  const { isLoading:deleteLoading, isError:deleteError} = useSelector(
    (state) => state.userDeleteProfile
  );

  //validate user
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProfileValidation),
  });

  //Update profile Submit
  const onSubmit = (data) => {
    dispatch(updateProfileAction({ ...data, image: imageUrl }));

  };

  //Delete profile Submit
  const deleteProfile =()=>{
    window.confirm("Are you sure you want to delete your profile") &&
    dispatch(deleteProfileAction())
  }

  useEffect(() => {
    if (userInfo) {
      setValue("fullName", userInfo?.fullName);
      setValue("email", userInfo?.email);
    }
    if (isSuccess) {
      dispatch({type: "USER_UPDATE_PROFILE_RESET"})
    }
    if (isError || deleteError) {
      toast.error(isError || deleteError)
      dispatch({type: "USER_UPDATE_PROFILE_RESET"})
      dispatch({
        type: "USER_DELETE_PROFILE_RESET",
      });
    }
  }, [userInfo, setValue,isError,isSuccess,dispatch,deleteError]);

  return (
    <SideBar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Profile</h2>

        <div className="w-full grid grid:cols-2 gap-6 ">
          <div className="col-span-2">
            <Uploader setimageUrl={setimageUrl}/>
          </div>
          <div className="col-span-2">
            <Imagepreview
              image={imageUrl}
              name={userInfo ? userInfo.fullName : "update your full name"}
            />
          </div>
        </div>

        <div className="w-full">
          <Input
            label="FullName"
            name="fullName"
            register={register("fullName")}
            placeholder="update your full name"
            type="text"
            bg={true}
          />
          {errors.fullName && <InlineError text={errors.fullName.message} />}
        </div>
        <div className="w-full">
          <Input
            label="email"
            name="email"
            register={register("email")}
            placeholder="example@gmail.com"
            type="email"
            bg={true}
          />
          {errors.email && <InlineError text={errors.email.message} />}
        </div>
        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          <button onClick={deleteProfile} disabled={deleteLoading || isLoading} className="bg-subMain transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
           
            {
              deleteLoading ? "Loading..." : "Delete Account"
            }
          </button>
          <button disabled={deleteLoading || isLoading}  className="bg-main transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
            {
              isLoading ? "Loading..." : "Update Profile"
            }
          </button>
        </div>
      </form>
    </SideBar>
  );
};

export default Profile;
