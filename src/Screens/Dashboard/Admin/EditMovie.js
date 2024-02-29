import React from "react";
import SideBar from "../SideBar";
import { Input, Message, Select } from "../../../Components/UsedInputs";
import Uploader from "../../../Components/Uploader";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { ImUpload } from "react-icons/im";
import CatsModasl from "../../../Components/Modals/CatsModasl";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {  useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { movieValidation } from "../../../Components/Validation/MovieValidation";
import {

  getMovieByIdAction,
  removeCastsAction,
  updateMovieAction,
} from "../../../redux/Actions/moviesActions";
import toast from "react-hot-toast";
import { InlineError } from "../../../Components/Notifications/Error";
import { Imagepreview } from "../../../Components/Imagepreview";
import Loader from "../../../Components/Notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";

const EditMovie = () => {
  const sameClass = "w-full gap-6 flex-colo min-h-screen";
  const [modalOpen, setModalOpen] = useState(false);
  const [cast, setcast] = useState(null);
  const [imageWithoutTitle, setimageWithoutTitle] = useState("");
  const [imageTitle, setimageTitle] = useState("");
  const [videoUrl, setvideoUrl] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  //get all categories
  const { categories } = useSelector((state) => state.categoryAll);

  const { isLoading, isError, movie } = useSelector(
    (state) => state.getMovieById
  );
  const {
   
    isError: ediError,
    isSuccess,
  } = useSelector((state) => state.updateMovie);

  const { casts } = useSelector((state) => state.DeleteEditAddResetCasts);

  //validate user
  const {
    register,
    handleSubmit,

    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(movieValidation),
  });

  //on Submit
  const onSubmit = (data) => {
    dispatch(
      updateMovieAction(movie?._id, {
        ...data,
        image: imageWithoutTitle,
        titleImage: imageTitle,
        video: videoUrl,
        casts: casts.length > 0 ? casts : movie?.casts,
      })
    );
  };

  //delete casts handler
  const deleteCastHandler = (id) => {
    dispatch(removeCastsAction(id));
    toast.success("Cast deleted successfully");
  };

  useEffect(() => {
    if (movie?._id !== id) {
      dispatch(getMovieByIdAction(id));
    } else {
      setValue("name", movie?.name);
      setValue("time", movie?.time);
      setValue("language", movie?.language);
      setValue("year", movie?.year);
      setValue("category", movie?.category);
      setValue("desc", movie?.desc);
      setimageWithoutTitle(movie?.image);
      setimageTitle(movie?.titleImage);
      setvideoUrl(movie?.video);
    }

    //if modal is false then reset cast
    if (modalOpen === false) {
      setcast();
    }

    //if its success then reset form and navigate to addMovie
    if (isSuccess) {
      dispatch({ type: "UPDATE_MOVIE_RESET" });
      navigate(`/edit/${id}`);
    }

    //if error then show error
    if (ediError) {
      toast.error("Something went wrong");
      dispatch({ type: "UPDATE_MOVIE_RESET" });
    }
  }, [modalOpen, isSuccess, ediError, dispatch, navigate, setValue, id, movie]);
  return (
    <SideBar>
      <CatsModasl
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        cast={cast}
      />
      {isLoading ? (
        <div className={sameClass}>
          <Loader />
        </div>
      ) : isError ? (
        <div className={sameClass}>
          <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">Something went wrong</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-bold">Edit "{movie?.name}"</h2>

          <div className="w-full grid md:grid-cols-2 gap-6">
            <div className="w-full">
              <Input
                label="Movie Title"
                placeholder="Name of the movie"
                type="text"
                bg={true}
                register={register("name")}
                name="name"
              />
              {errors.name && <InlineError text={errors.name.message} />}
            </div>
            <div className="w-full">
              <Input
                label="Hours"
                placeholder="Write the number of hour"
                type="number"
                bg={true}
                register={register("time")}
                name="time"
              />
              {errors.time && <InlineError text={errors.time.message} />}
            </div>
          </div>

          <div className="w-full grid md:grid-cols-2 gap-6">
            <div className="w-full">
              <Input
                label="Languaje Used"
                placeholder="Write the lenguage"
                type="text"
                bg={true}
                register={register("language")}
                name="language"
              />
              {errors.language && (
                <InlineError text={errors.language.message} />
              )}
            </div>
            <div className="w-full">
              <Input
                label="Year of release"
                placeholder="Write the year of release"
                type="number"
                bg={true}
                register={register("year")}
                name="year"
              />
              {errors.year && <InlineError text={errors.year.message} />}
            </div>
          </div>

          {/*IMAGE*/}
          <div className="w-full grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-border font-semibold text-sm">
                Image without title
              </p>
              <Uploader setimageUrl={setimageWithoutTitle} />
              <Imagepreview
                image={imageWithoutTitle}
                name="imageWithoutTitle"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-border font-semibold text-sm">
                Image without title
              </p>
              <Uploader setimageUrl={setimageTitle} />
              <Imagepreview image={imageTitle} name="imageTitle" />
            </div>
          </div>

          {/*DESCRIPCION*/}
          <div className="w-full">
            <Message
              label="Description"
              placeholder="Make it short and sweet"
              name="desc"
              register={{ ...register("desc") }}
              bg={true}
            />
            {errors.desc && <InlineError text={errors.desc.message} />}
          </div>

          {/*CATEGORIA*/}
          <div className="text-sm w-full">
            <Select
              label="Movie Catagory"
              options={categories?.length > 0 ? categories : []}
              name="category"
              register={{ ...register("category") }}
              bg={true}
            />
            {errors.category && <InlineError text={errors.category.message} />}
          </div>

          {/*VIDEO*/}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-border font-semibold text-sm">
              Movie video
            </label>
            <div
              className={`w-full grid ${videoUrl && "md:grid-cols-2"} gap-6`}
            >
              {videoUrl && (
                <div className="w-full bg-main text-sm text-subMain py-4 border border-border rounded flex-colo">
                  Video Uploaded!!!
                </div>
              )}

              <Uploader setimageUrl={setvideoUrl} />
            </div>
          </div>

          <div className="w-full grid lg:grid-cols-2 gap-6 items-start">
            <div className="w-full">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full py-4 bg-main border border-subMain border-dashed text-white rounded"
              >
                Add Cast
              </button>
              <span className="text-border text-xs">
                if you add new casts the previous casts will be deleted. So you should add them again
              </span>
            </div>

            <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4">
              {casts?.length > 0 &&
                casts.map((user) => (
                  <div
                    key={user._id}
                    className="p-2 italic text-xs text-text rounded flex-colo bg-main border border-border"
                  >
                    <img
                      alt={user?.name}
                      src={`${
                        user?.image ? user?.image : "/img-movie/user-fill.jpg"
                      }`}
                      className="w-full h-24 object-cover rounded mb-4"
                    />
                    <p>{user?.name}</p>
                    <div className="flex-rows mt-2 w-full gap-2">
                      <button
                        onClick={() => deleteCastHandler(user?.id)}
                        className="w-6 h-6  flex-colo bg-dry border border-border text-subMain rounded"
                      >
                        <MdDelete />
                      </button>
                      <button
                        onClick={() => {
                          setcast(user);
                          setModalOpen(true);
                        }}
                        className="w-6 h-6  flex-colo bg-dry border border-border text-green-400 rounded"
                      >
                        <FaEdit />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <button
            disabled={isLoading}
            onClick={handleSubmit(onSubmit)}
            className="bg-subMain w-full flex-rows gap-6 font-medium transitions hover:bg-dry border border-subMain text-white py-4 rounded"
          >
            {isLoading ? (
              "Please wait..."
            ) : (
              <>
                <ImUpload /> Publish Movie
              </>
            )}
          </button>
        </div>
      )}
    </SideBar>
  );
};

export default EditMovie;
