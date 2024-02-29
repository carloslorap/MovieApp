import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSearch, FaHeart } from "react-icons/fa";
import { CgUser } from "react-icons/cg";
import { useSelector } from "react-redux";
const NavBar = () => {
  const hover = "hover:text-subMain transitions text-white";
  const Hover =
    () =>
    ({ isActive }) =>
      isActive ? "text-subMain" : hover;


  const [search, setsearch] = useState("")
  const navigate =useNavigate()
  const { userInfo } = useSelector((state) => state.userLogin);
  const { linkedMovies } = useSelector(
    (state) => state.userGetFavorite
  );

  const handleSearch = (e)=>{
    e.preventDefault();
    if (search.trim()) {
      navigate(`/movies/${search}`)
      setsearch(search)
    }else{
      navigate(`/movies`)
    }
  }



  return (
    <>
      <div className="bg-main shadow-md sticky top-0 z-20">
        <div className="container mx-auto py-4 px-2 lg:grid gap-56 xl:grid-cols-6 grid-cols-5 justify-between items-center">
    
          {/* <div className="col-span-3">
            <form onSubmit={handleSearch} className="w-full text-sm bg-dryGray rounded flex-btn gap-4">
              <button className="bg-subMain w-12 flex-colo h-12 rounded text-white ">
                <FaSearch />
              </button>
              <input
                type="search"
                value={search}
                onChange={(e)=> setsearch(e.target.value)}
                placeholder="Search Movie name...."
                className="font-medium placeholder:text-border text-sm w-11/12 h-12 bg-transparent border-none px-2 text-black"
              />
            </form>
          </div> */}

          <div className="col-span-3 font-medium text-sm hidden xl:gap-10 2xl:gap-20 justify-between lg:flex xl:justify-end items-center">
          <div className=" lg:block hidden">
            <Link to="/">
              <img src="/img-movie/Rectangle 31.png" alt="#" className="w-full h-10 object-contain" />
            </Link>
          </div>
            <NavLink to="/movies" className={Hover()}>
              Movie
            </NavLink>
            <NavLink to="/about-us" className={Hover()}>
              About Us
            </NavLink>
            <NavLink to="/contact-us" className={Hover()}>
              Contact Us
            </NavLink>
          
          </div>
          <div   className=" xl:col-span-3  col-span-2 font-medium text-sm hidden xl:gap-10 gap-5 2xl:gap-10  lg:flex xl:justify-end  items-center"   >
          <NavLink
              to={
                userInfo?.isAdmin
                  ? "/dashboard"
                  : userInfo
                  ? "/profile"
                  : "/login"
              }
              className={Hover()}
            >
                {
                    userInfo ? (<img src={userInfo?.image ? userInfo?.image :"/img-movie/user-fill.jpg"} alt={userInfo?.fullName} className="w-14 h-9  rounded-full border object-cover border-main"/>):
                    <CgUser className="w-8 h-8" />
                }
            
            </NavLink>
            <NavLink to="/favorites" className={`${Hover()} relative `}>
              <FaHeart className="w-6 h-6" />
              <div className="w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-2 -right-3">
                {linkedMovies?.length}
              </div>
            </NavLink>

            <form onSubmit={handleSearch} className="w-full  h-9 text-sm bg-transparent border border-gray-700 rounded flex-btn gap-4">
              <button className="bg-subMain w-12 flex-colo h-9 rounded text-white ">
                <FaSearch />
              </button>
              <input
                type="search"
                value={search}
                onChange={(e)=> setsearch(e.target.value)}
                placeholder="Search Movie name...."
                className="font-medium placeholder:text-border text-sm w-11/12 h-12 bg-transparent border-none px-2 text-white"
              />
            </form>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default NavBar;
