import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Edit from "../assets/icons/edit-button.svg";

const SingleBlog = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [desc, setDesc] = useState(props.desc);
  const [img, setImg] = useState(props.image);

  return (
    <>
      <a
        href="#"
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => setShowModal(true)}
      >
        Read more
        <svg
          aria-hidden="true"
          class="w-4 h-4 ml-2 -mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </a>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-5/12 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <button
                    className="bg-red-600 rounded-full text-sm hover:bg-white hover:text-black text-white  py-2 px-4  hover:border border-red-600"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
                {/*body*/}
                <div class="m-4 max-w-2xl  bg-white border border-gray-200 rounded-lg shadow bg-gray-300">
                  <a href="#" class="object-cover object-center">
                    <img
                      class="rounded-t-lg m-auto w-96 h-64 sm:h-64 sm:w-96 object-cover object-center"
                      src={img}
                      alt=""
                    />
                  </a>
                  <div class="p-5">
                    <a href="#">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                        {title}
                      </h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-500 ">{desc}</p>
                  </div>
                </div>

                {/*footer*/}

                <div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="bg-transparent text-lg  text-black  font-bold py-2 px-4 rounded-full border border-blue-800"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default SingleBlog;
