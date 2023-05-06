import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Edit from "../assets/icons/edit-button.svg";
import Swal from "sweetalert2";

const SingleProject = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [desc, setDesc] = useState(props.desc);
  const [img, setImg] = useState(props.image);
  const [isDonation, setIsDonation] = useState(props.isDonation);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [contact, setContact] = useState("");
  const [amount, setAmount] = useState(0);
  const [reason, setReason] = useState("");
  const [image, setImage] = useState("");

  const validate = () => {
    let isValidate = true;
    if (!name) {
      isValidate = false;
      Swal.fire({
        title: "Error!",
        text: "Name Required",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    if (!date) {
      isValidate = false;
      Swal.fire({
        title: "Error!",
        text: "Date Required",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    if (!contact) {
      isValidate = false;
      Swal.fire({
        title: "Error!",
        text: "Contact Number Required",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    if (!amount) {
      isValidate = false;
      Swal.fire({
        title: "Error!",
        text: "Amount Required",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    return isValidate;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(name, date, contact, amount, reason, image);
      await axios
        .post(`http://localhost:5000/project/donation/${props.id}`, {
          name,
          date,
          contact,
          amount,
          reason,
          image,
        })
        .then((res) => {
          alert("Item updated successfully");
          // Clear form fields
          setShowModal(false);
          window.location.href = "/admin/projects";
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const handleImageChange = async (e) => {
    e.preventDefault();
    try {
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
      // setLoading(false)
      console.log(res.data.url);
      setImage(res.data.url);
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

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
                {!showDonationModal ? (
                  <div class="m-4 max-w-2xl  bg-white border border-gray-200 rounded-lg shadow bg-gray-300">
                    <a href="#" class="object-cover object-center">
                      <img
                        class="rounded-t-lg m-auto w-96 h-64 sm:h-64 sm:w-96 object-cover object-center"
                        src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80"
                        alt=""
                      />
                    </a>
                    <div class="p-5">
                      <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                          Noteworthy technology acquisitions 2021
                        </h5>
                      </a>
                      <p class="mb-3 font-normal text-gray-500 ">
                        Here are the biggest enterprise technology acquisitions
                        of 2021 so far, in reverse chronological order.
                      </p>
                    </div>
                  </div>
                ) : null}

                {showDonationModal ? (
                  <form className="mt-6">
                    <div className="mb-2">
                      <label>
                        <span className="text-gray-700">
                          Name Of The Donator
                        </span>
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
                          onChange={(e) => setName(e.target.value)}
                        />
                      </label>
                    </div>
                    <div className="mb-2">
                      <label>
                        <span className="text-gray-700">
                          Date Of The Payment
                        </span>
                        <input
                          type="date"
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
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </label>
                    </div>
                    <div className="mb-2">
                      <label>
                        <span className="text-gray-700">Contact Number</span>
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
                          onChange={(e) => setContact(e.target.value)}
                        />
                      </label>
                    </div>
                    <div className="mb-2">
                      <label>
                        <span className="text-gray-700">Donation Amount</span>
                        <input
                          type="number"
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
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </label>
                    </div>
                    <div className="mb-2">
                      <label>
                        <span className="text-gray-700">
                          Reason For The Donation
                        </span>
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
                          onChange={(e) => setReason(e.target.value)}
                        />
                      </label>
                    </div>
                    <div className="mb-2">
                      <label>
                        <span className="text-gray-700">
                          Upload Prove Of Your Payment
                        </span>
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
                      </label>
                    </div>
                  </form>
                ) : null}
                {/*footer*/}

                <div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="bg-transparent text-lg  text-black  font-bold py-2 px-4 rounded-full border border-blue-800"
                      type="button"
                      onClick={handleSubmit}
                      hidden={!showDonationModal}
                    >
                      Submit
                    </button>
                    <button
                      className="bg-transparent text-lg  text-black  font-bold py-2 px-4 rounded-full border border-blue-800"
                      type="button"
                      hidden={showDonationModal}
                      onClick={() => setShowDonationModal(true)}
                    >
                      Donate
                    </button>
                    <button
                      className="bg-transparent text-lg  text-black  font-bold py-2 px-4 rounded-full border border-blue-800"
                      type="button"
                      hidden={!showDonationModal}
                      onClick={() => setShowDonationModal(false)}
                    >
                      Back
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

export default SingleProject;
