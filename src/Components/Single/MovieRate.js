import React, { useEffect } from "react";
import { Title } from "../Title";
import { BsBookmarkStarFill } from "react-icons/bs";
import { Message, Select } from "../UsedInputs";
import Rating from "../Stars";

import { Empty } from "../Notifications/Empty";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReviewValidation } from "../Validation/MovieValidation";
import toast from "react-hot-toast";
import { InlineError } from "../Notifications/Error";
import { Link } from "react-router-dom";
import { reviewMovieAction } from "../../redux/Actions/moviesActions";

const Ratings = [
  {
    title: "0 - Poor",
    value: 0,
  },
  {
    title: "1 - Fair",
    value: 1,
  },
  {
    title: "2 - Good",
    value: 2,
  },
  {
    title: "3 - Very Good",
    value: 3,
  },

  {
    title: "4 - Excellent",
    value: 4,
  },
  {
    title: "5 - Masterpiece",
    value: 5,
  },
];

const MovieRate = ({ movie }) => {
  const dispatch = useDispatch();

  const { isLoading, isError } = useSelector((state) => state.createReview);
  const { userInfo } = useSelector((state) => state.userLogin);

  //validate review
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ReviewValidation),
  });

  //on Submit
  const onSubmit = (data) => {
    dispatch(
      reviewMovieAction({
        id: movie?._id,
        review: { ...data },
      })
    );
  };

  useEffect(() => {
    if (isError) {
      toast.error(isError);
      dispatch({ type: "CREATE_REVIEW_RESET" });
    }
  }, [isError, dispatch]);

  return (
    <div className="my-12">
      <Title title="Reviews" Icon={BsBookmarkStarFill} />

      <div className="mt-10 xl:grid flex-colo grid-cols-5 gap-12 bg-main xs:p-10 py-10 px-2 sm:p-20 rounded">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="xl:col-span-2 w-full flex flex-col gap-8"
        >
          <h3 className="text-xl text-text font-semibold">
            {" "}
            Review "{movie.name}"
          </h3>
          <p className="text-sm leading-7 font-medium text-border">
            Write Your review may be edited for content
          </p>
          <div className="text-sm w-full">
            <Select
              label="Select Rating"
              options={Ratings}
              name="rating"
              register={{ ...register("rating") }}
            />
            <div className="flex mt-4 text-lg gap-2 text-start">
              <Rating value={watch("rating", false)} />
              {errors.rating && <InlineError text={errors.rating.message} />}
            </div>
          </div>
          <div className="w-full">
            <Message
              label="Message"
              placeholder="Write your review here"
              name="comment"
              register={{ ...register("comment") }}
            />
            {errors.comment && <InlineError text={errors.comment.message} />}
          </div>
          {userInfo ? (
            <button
              disabled={isLoading}
              type="submit"
              className="bg-subMain border border-subMain text-white py-3 w-full flex-colo rounded"
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-dry border border-subMain text-white py-3 w-full flex-colo rounded"
            >
              Login to review this movie
            </Link>
          )}
        </form>
        <div className="col-span-3 flex flex-col gap-6">
          <h3 className="text-sm text-text font-semibold px-16" >
            Reviews ({movie?.numberOfReviews})
          </h3>
          <div className="w-full flex flex-col bg-main gap-6 rounded-lg md:p-12 p-6 h-header">
            {movie?.reviews?.length > 0 ? (
              movie?.reviews?.map((review) => (
                <div
                  key={review?._id}
                  className="md:grid flex flex-col w-full grid-cols-12 gap-6 bg-transparent p-4 rounded-lg"
                >
                  <div className="col-span-2 bg-main hidden md:block">
                    <img
                      src={
                        review?.userImage
                          ? review?.userImage
                          : "/img-movie/user-fill.jpg"
                      }
                      alt={review?.userName}
                      className="w-full h-24 rounded-lg object-cover"
                    />
                  </div>
                  <div className="col-span-7 flex flex-col gap-2">
                    <h2>{review?.userName}</h2>
                    <p className="text-xs leading-6 font-medium text-text">
                      {review?.comment}
                    </p>
                  </div>
                  <div className="col-span-3 flex-rows border-l border-border text-xs gap-1 text-start">
                    <Rating value={review?.rating} />
                  </div>
                </div>
              ))
            ) : (
              <Empty message={`Be first to rate "${movie?.name}"`} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieRate;
