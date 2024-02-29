import Axios from "./Axios";

//register new user Api call
const registerService = async (user) => {
  const { data } = await Axios.post("/users", user);

  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }

  return data;
};

//logout user function
const logoutService = () => {
  localStorage.removeItem("userInfo");
  return null;
};

//login user API call
const loginService = async (user) => {
  const { data } = await Axios.post("/users/login", user);
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};

//update Profile API call
const updateProfileService = async (user, token) => {
  const { data } = await Axios.put("/users", user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
};

//delete Profile API call
const deleteProfileService = async (token) => {
  const { data } = await Axios.delete("/users/deleteuser", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    localStorage.removeItem("userInfo");
  }
  return data;
};

//change Password API call
const changePasswordService = async (passwords, token) => {
  const { data } = await Axios.put("/users/password", passwords, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

//get all favorites movies API call
const getFavoritesMoviesService = async (token) => {
  const { data } = await Axios.get("/users/favorites", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

//delete all favorites movies API call
const deleteFavoritesMoviesService = async (token) => {
  const { data } = await Axios.delete("/users/favorites", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

//like movie API call
const likeMovieService = async (movieId, token) => {
  const { data } = await Axios.post(`/users/favorites`, movieId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};





////// ***** ADMIN (START)*****///////////

//admin get all Users
const getAlluserService = async (token) => {
  const { data } = await Axios.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

//admin delete user
const deleteUserService = async (id, token) => {
  const { data } = await Axios.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

////// ***** ADMIN (END)*****///////////

export {
  registerService,
  loginService,
  logoutService,
  updateProfileService,
  deleteProfileService,
  changePasswordService,
  getFavoritesMoviesService,
  deleteFavoritesMoviesService,
  getAlluserService,
  deleteUserService,
  likeMovieService
};
