import React from "react";
import {  FaEdit } from "react-icons/fa";

import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { GoEye } from "react-icons/go";
import { BsFillPlayCircleFill } from "react-icons/bs";

const Head = "text-xs text-left text-white font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3";



const Rows = (movie, i, onDeleteHandler, admin) => {

  
  return (
    <tr key={i}>
      <td className={`${Text}`}>
        <div className="w-12 p-1 bg-main border border-border h-12 rounded overflow-hidden">
          <img
            src={movie?.image}
            alt="ef"
            className="w-full h-full object-cover"
          />
        </div>
      </td>
      <td className={`${Text} truncate`}>
        {`${
              movie?.name.length > 25
                ? `${movie?.name.slice(0, 24)}...`
                : movie?.name
            }`}
        </td>
      <td className={`${Text}`}>{movie?.category}</td>
      <td className={`${Text}`}>{movie?.language}</td>
      <td className={`${Text}`}>{movie?.year}</td>
      <td className={`${Text}`}>{movie?.time}</td>
      <td className={`${Text} float-right flex-rows gap-2`}>
        {admin ? (
          <>
            <Link to={`/edit/${movie?._id}`} className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2">
              Edit <FaEdit className="text-green-500" />
            </Link>
            <button className="bg-subMain text-white rounded flex-colo w-7 h-7">
              <MdDelete onClick={() => onDeleteHandler(movie?._id)} />
            </button>
          </>
        ) : (
          <>
            <Link 
            to={`/watch/${movie?._id}`}
            className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2">
              Play <BsFillPlayCircleFill className="text-green-500 bg-white rounded-lg border border-green-500" />
            </Link>
            <Link
              to={`/movie/${movie?._id}`}
              className="bg-subMain text-white rounded flex-colo w-7 h-7"
            >
              <GoEye />
            </Link>
          </>
        )}
      </td>
    </tr>
  );
};

const Table = ({ data, admin, onDeleteHandler }) => {
  return (
    <div className=" overflow-hidden relative w-full">
      <table className="w-full table-auto border border-border divide-y divide-border">
        <thead>
          <tr className="bg-transparent ">
            <th scope="col" className={`${Head}`}>
              Image
            </th>
            <th scope="col" className={`${Head}`}>
              Name
            </th>
            <th scope="col" className={`${Head}`}>
              Category
            </th>
            <th scope="col" className={`${Head}`}>
              Language
            </th>
            <th scope="col" className={`${Head}`}>
              Year
            </th>
            <th scope="col" className={`${Head}`}>
              Hours
            </th>
            <th scope="col" className={`${Head} text-end`}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {data.map((movie, i ) => Rows(movie, i, onDeleteHandler, admin))}
        </tbody>
      </table>
    </div>
  );
};



export default Table;
