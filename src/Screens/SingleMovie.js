import React, { useEffect,useState } from "react";
import Layout from "../Layout/Layout";
import { useParams } from "react-router-dom";
import Movieinfo from "../Components/Single/Movieinfo";
import MovieCats from "../Components/Single/MovieCats";
import MovieRate from "../Components/Single/MovieRate";
import { Title } from "../Components/Title";
import { BsCollectionFill } from "react-icons/bs";
import Movie from "../Components/Movie";
import ShareModals from "../Components/Modals/ShareModals";
import { useDispatch, useSelector } from "react-redux";
import { getMovieByIdAction } from "../redux/Actions/moviesActions";
import Loader from "../Components/Notifications/Loader";
 import { RiMovie2Line } from "react-icons/ri";
// import { SidebarContext } from "../Context/DrawerContext";
// import { DowloadVideo } from "../Context/Functionalities";
// import FileSaver from "file-saver";

const SingleMovie = () => {
  const [modalOpen, setmodalOpen] = useState(false);

  //solo para la descargar de videos (no es lo ensencial en un proyecyto comun asi q no te esfuerze en entenderlo)
  //const [progress, setprogress] = useContext(SidebarContext);

  const { id } = useParams();
  const dispatch = useDispatch();
  const sameClass = "w-full gap-6 flex-colo min-h-screen";

  const { isLoading, isError, movie } = useSelector(
    (state) => state.getMovieById
  );

  const { movies } = useSelector((state) => state.getAllMovies);

  //related movie
  const RelatedMovies = movies?.filter((m) => m.category === movie?.category);
  

  //descargar de video (ya te dije que no es importante)
  // const DownloadMovieVideo = async (videoUrl, name) => {
  //   await DowloadVideo(videoUrl, setprogress).then((data) => {
  //     setprogress(0);
  //     FileSaver.saveAs(data, name);
  //   });
  // };

  useEffect(() => {
    dispatch(getMovieByIdAction(id));
  }, [dispatch, id]);
  return (
    <Layout>
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
        <>
          <ShareModals
            modalOpen={modalOpen}
            setModalOpen={setmodalOpen}
            movie={movie}
          />
          <Movieinfo
            movie={movie}
            setModalOpen={setmodalOpen}
            // DowloadVideo={DownloadMovieVideo}
            // progress={progress}
          />
          <div className="container mx-auto min-h-screen px-2 my-6">
            <MovieCats movie={movie} />
            <MovieRate movie={movie} />

            {RelatedMovies?.length > 0 && (
              <div className="my-16">
                <Title title="Related Movies" Icon={BsCollectionFill} />
                <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                  {RelatedMovies.map((movie, index) => (
                    <Movie key={index} movie={movie} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </Layout>
  );
};

export default SingleMovie;
