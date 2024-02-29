import React, { useEffect, useState } from "react";
import MainModals from "./MainModals";
import { Input } from "../UsedInputs";
import Uploader from "../Uploader";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  addCastsAction,
  updateCastsAction,
} from "../../redux/Actions/moviesActions";
import toast from "react-hot-toast";
import { InlineError } from "../Notifications/Error";
import { Imagepreview } from "../Imagepreview";

const CatsModasl = ({ modalOpen, setModalOpen, cast }) => {
  const dispatch = useDispatch();
  const [castImage, setcastImage] = useState("");
 // const generateId = Math.floor(Math.random() * 100000000);
  const image = castImage ? castImage : cast?.image;

  //validate cast
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("Cast Name is required"),
      })
    ),
  });

  //on Submit
  const onSubmit = (data) => {
    if (cast) {
      //if cast is not null then update cast
      dispatch(
        updateCastsAction({
          ...data,
          image: image,
          id: cast._id,
        })
      );
      toast.success("Cast updated successfully");
    } else {
      //else create cast
      dispatch(
        addCastsAction({
          ...data,
          image: image,
        })
      );
      toast.success("Cast created successfully");
    }
    reset();
    setcastImage("");
    setModalOpen(false);
  };

  useEffect(() => {
    if (cast) {
      setValue("name", cast?.name);
    }
  }, [cast, setValue]);

  return (
    <MainModals modalOpen={modalOpen} setModalOpen={setModalOpen} cast={cast}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle bg-main text-white p-10 overflow-y-auto h-full rounded-2xl">
        <h2 className="text-3xl font-bold">
          {cast ? "Update Cast" : "Create Cast"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 text-left mt-6"
        >
          <div className="w-full">
            <Input
              label="cats Name"
              placeholder="cats Name"
              type="text"
              bg={false}
              register={register("name")}
              name="name"
            />
            {errors.name && <InlineError text={errors.name.message} />}
          </div>

          <div className="flex flex-col gap-2 ">
            <p className="text-border font-semibold text-sm">Cats Image</p>
            <Uploader setimageUrl={setcastImage} />
            <Imagepreview
              image={image ? image : "/img-movie/user-fill.jpg"}
              name="castImage"
            />
          </div>
          <button
            type="submit"
            onClick={() => setModalOpen(false)}
            className="w-full flex-rows gap-4 py-3 rounded bg-subMain text-white"
          >
            {cast ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </MainModals>
  );
};

export default CatsModasl;
