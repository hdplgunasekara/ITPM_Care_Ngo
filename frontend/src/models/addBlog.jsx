import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import Swal from "sweetalert2";

const AddBlog = (props) => {
  const [showModal, setShowModal] = React.useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    let isValidate = true;
    if (!title) {
      isValidate = false;
      Swal.fire({
        title: "Error!",
        text: "Title Required",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    if (!desc) {
      isValidate = false;
      Swal.fire({
        title: "Error!",
        text: "Description Required",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    if (!image) {
      isValidate = false;
      Swal.fire({
        title: "Error!",
        text: "Image Required",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    return isValidate;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted");
      await axios
        .post("http://localhost:5000/blog/", {
          title,
          desc,
          image,
        })
        .then((res) => {
          alert("Blog added successfully");
          // Clear form fields
          setTitle("");
          setDesc("");
          setImage("");
          window.location.href = "/admin/blogs";
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const handleImageChange = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const file = e.target.files[0];

      if (!file) return alert("File not exist.");

      if (file.size > 1024 * 1024)
        // 1mb
        return alert("Size too large!");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        // 1mb
        return alert("File format is incorrect.");

      let formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "carengo");
      formData.append("cloud_name", "itp2022");

      // setLoading(true)
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/itp2022/image/upload",
        formData,
        {
          method: "post",
          body: formData,
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      console.log(res.data.url);
      setImage(res.data.url);
      setIsLoading(false);
    } catch (err) {
      console.log(err.response.data.msg);
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add Blog
      </button>
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
                <div className="relative p-6 flex-auto ">
                  <h1 className=" text-center mb-2 text-sm font-bold text-gray-900 dark:text-gray-900 md:text-md lg:text-lg">
                    ADD NEW BLOG
                  </h1>
                  <form className="mt-6">
                    <div className="mb-2">
                      <label>
                        <span className="text-gray-700">Blog Title</span>
                        <input
                          type="text"
                          name="name"
                          className="

                          w-96
            block px-16 py-2 mt-2
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
            text-black
            
          "
                          placeholder="Type Blog Title Here.."
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </label>
                    </div>
                    <div className="mb-2">
                      <label>
                        <span class="text-gray-700">Description</span>
                        <textarea
                          name="message"
                          className="
            block
            w-96
            mt-2 px-16 py-8
            border-gray-700
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
            text-black
          "
                          placeholder="Type Blog Description Here.."
                          rows="5"
                          onChange={(e) => setDesc(e.target.value)}
                        ></textarea>
                      </label>
                    </div>
                    <div className="mb-2">
                      <label>
                        <span className="text-gray-700">Upload Image</span>
                        <input
                          type="file"
                          name="file"
                          className="

            w-full
            block px-16 py-2 mt-2
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
            text-black
            
          "
                          onChange={handleImageChange}
                        />
                        {image ? (
                          <span className="text-gray-700">Image Selected</span>
                        ) : null}
                        {isLoading && (
                          <RotatingLines
                            strokeColor="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="60"
                            visible={true}
                          />
                        )}
                      </label>
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="bg-transparent text-lg  text-black  font-bold py-2 px-4 rounded-full border border-blue-800"
                      type="button"
                      onClick={handleSubmit}
                    >
                      Create
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

export default AddBlog;
