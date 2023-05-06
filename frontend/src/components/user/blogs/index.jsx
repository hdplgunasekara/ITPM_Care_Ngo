import React from "react";
import axios from "axios";
import SingleBlog from "../../../models/singleBlog";

const UserBlog = () => {
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

  const filterBlogListByTitle = (title) => {
    if (!title) {
      axios
        .get("http://localhost:5000/blog/")
        .then((res) => {
          setBlogList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const filteredList = blogList.filter((blog) => blog.title.includes(title));
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
            onChange={(e) => filterBlogListByTitle(e.target.value)}
          />
        </div>
        <div className="flex bg-transparent text-white flex-auto"></div>
        <div className="flex text-white me-20"></div>
      </div>

      <div className="items-stretch ms-20 content-center">
        <div className="flex flex-wrap justify-evenly ">
          {blogList.map((blog) => (
            <div class="m-4 max-w-sm  bg-white border border-gray-200 rounded-lg shadow bg-gray-300">
              <a href="#">
                <img class="rounded-t-lg w-96 h-64" src={blog.image} alt="" />
              </a>
              <div class="p-5">
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                    {blog.title.toString().substring(0, 100)}
                  </h5>
                </a>
                <p class="mb-3 font-normal text-gray-500 ">
                  {blog.desc.toString().substring(0, 300)}
                </p>
                <SingleBlog
                  id={blog._id}
                  title={blog.title}
                  desc={blog.desc}
                  image={blog.image}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserBlog;
