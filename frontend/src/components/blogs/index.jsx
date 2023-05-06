import React from "react";
import "./styles.css";
import Edit from "../../assets/icons/edit-button.svg";
import Delete from "../../assets/icons/delete-button.svg";
import AddBlog from "../../models/addBlog";
import axios from "axios";
import EditBlog from "../../models/editBlog";

const Blog = () => {
  const [blogList, setBlogList] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/blog/")
      .then((res) => {
        console.log(res.data);
        setBlogList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onclickDelete = (id) => {
    axios
      .delete("http://localhost:5000/blog/" + id)
      .then((res) => {
        alert("Blog deleted successfully");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterProjectListByTitle = (title) => {
    if (!title) {
      axios
        .get("http://localhost:5000/blog/")
        .then((res) => {
          console.log(res.data);
          setBlogList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const filteredList = blogList.filter((blog) =>
      blog.title.includes(title)
    );
    setBlogList(filteredList);
  };

  return (
    <div className="pt-10">
      <h1>Blogs</h1>
      <div className="flex flex-wrap mb-10">
        <div className="flex  text-white ms-20 ">
          <input
            type="search"
            id="default-search"
            class="
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
            placeholder="Search..."
            required
            onChange={(e) => filterProjectListByTitle(e.target.value)}
          />
        </div>
        <div className="flex bg-transparent text-white flex-auto"></div>
        <div className="flex text-white me-20">
          <AddBlog />
        </div>
      </div>
      {blogList.map((blog) => (
        <div className="items-stretch ms-20">
          <a
            href="#"
            class="flex flex-col justify-evenly items-center bg-white borde000r border-gray-200 rounded-lg shadow md:flex-row w-11/12 h-52 hover:bg-gray-100"
          >
            <img
              class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
              src={blog.image}
              alt="Blog Image"
            />
            <div class="flex flex-col justify-between p-4 leading-normal">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-black ">
                {blog.title}
              </h5>
              <p class="mb-3 font-normal text-gray-700 max-w-2xl">
                {blog.desc}
              </p>
            </div>
            <div flex flex-col justify-between p-4>
              <EditBlog
                id={blog._id}
                title={blog.title}
                desc={blog.desc}
                image={blog.image}
              />
              <a
                href="#"
                class="inline-flex ml-5 items-center px-4 py-2 text-sm font-medium text-center text-white "
                onClick={() => onclickDelete(blog._id)}
              >
                <img src={Delete} className="h-10"></img>
              </a>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default Blog;
