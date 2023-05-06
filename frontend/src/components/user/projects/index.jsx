import React from "react";
import SingleProject from "../../../models/singleProject";
import axios from "axios";

const UserProject = () => {
  const [projectList, setProjectList] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/project/")
      .then((res) => {
        setProjectList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filterProjectListByTitle = (title) => {
    if (!title) {
      axios
        .get("http://localhost:5000/project/")
        .then((res) => {
          setProjectList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const filteredList = projectList.filter((project) =>
      project.title.includes(title)
    );
    setProjectList(filteredList);
  };
  return (
    <div className="pt-10">
      <h1>Projects</h1>
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
        <div className="flex text-white me-20"></div>
      </div>

      <div className="items-stretch ms-20 content-center">
        <div className="flex flex-wrap justify-evenly ">
          {projectList.map((project) => (
            <div class="m-4 max-w-sm  bg-white border border-gray-200 rounded-lg shadow bg-gray-300">
              <a href="#">
                <img
                  class="rounded-t-lg w-96 h-64"
                  src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80"
                  alt=""
                />
              </a>
              <div class="p-5">
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                    {project.title.toString().substring(0, 100)}
                  </h5>
                </a>
                <p class="mb-3 font-normal text-gray-500 ">
                  {project.desc.toString().substring(0, 300)}
                </p>
                <SingleProject
                  id={project._id}
                  title={project.title}
                  desc={project.desc}
                  image={project.image}
                  isDonation={project.isdonation.toString()}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProject;
