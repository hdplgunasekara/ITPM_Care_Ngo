import './App.css';
import NavigationButtons from './pages/navButton/navButton';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import React, { useContext } from "react"
import { Context } from "./context/Context"
import Regsiter from './pages/login/Regsiter' 
import NavBar from './components/navbar'
import Project from './components/projects';
import UserProject from './components/user/projects';
import Blog from './components/blogs';
import UserBlog from './components/user/blogs';
import Home from './components/user/home';


function App() {
  //after login
  const { user } = useContext(Context)
  return (
    <div className="App">
    <NavBar />
    <Router>
    <Routes>
          {/* Admin routes */}
          <Route exact path="/admin" >
            <Route exact path="/admin/projects" element={<Project />} />
            <Route exact path="/admin/blogs" element={<Blog />} />
          </Route>

          {/* User routes */}
          <Route exact path="/" >
          <Route exact path="/" element={<Home />} />
            <Route exact path="/projects" element={<UserProject />} />
            <Route exact path="/blogs" element={<UserBlog />} />
          </Route>
       
       
      </Routes>
    </Router>
  </div>
 );
}

export default App;
