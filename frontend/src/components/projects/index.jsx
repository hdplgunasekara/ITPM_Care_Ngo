import React from "react";
import "./styles.css";
import Edit from "../../assets/icons/edit-button.svg";
import Delete from "../../assets/icons/delete-button.svg";
import AddProject from "../../models/addproject";
import axios from "axios";
import EditProject from "../../models/editProject";

const Project = () => {
  const [projectList, setProjectList] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/project/")
      .then((res) => {
        console.log(res.data);
        setProjectList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onclickDelete = (id) => {
    axios
      .delete("http://localhost:5000/project/" + id)
      .then((res) => {
        alert("Item deleted successfully");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterProjectListByTitle = (title) => {
    if (!title) {
      axios
        .get("http://localhost:5000/project/")
        .then((res) => {
          console.log(res.data);
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
        <div className="flex text-white me-20">
          <AddProject />
        </div>
      </div>
      {projectList.map((project) => (
        <div className="items-stretch ms-20">
          <a
            href="#"
            class="flex flex-col justify-evenly items-center bg-white borde000r border-gray-200 rounded-lg shadow md:flex-row w-11/12 h-52 hover:bg-gray-100"
          >
            <img
              class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
              src={project.image}
              alt=""
            />
            <div class="flex flex-col justify-between p-4 leading-normal">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-black ">
                {project.title.toString().substring(0, 200)}
              </h5>
              <p class="mb-3 font-normal text-gray-700 max-w-2xl">
                {project.desc.toString().substring(0, 500)}
              </p>
            </div>
            <div flex flex-col justify-between p-4>
              <EditProject
                id={project._id}
                title={project.title}
                desc={project.desc}
                image={project.image}
                isDonation={project.isdonation.toString()}
              />
              <a
                href="#"
                class="inline-flex ml-5 items-center px-4 py-2 text-sm font-medium text-center text-white "
                onClick={() => onclickDelete(project._id)}
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

export default Project;
