const router = require("express").Router()
const Project = require("../model/project")
const Donation = require("../model/donation")

//create Project
router.post("/", async (req, res) => {
  console.log(req.body)
  const newProject = new Project(req.body)
  try {
    const saveProject = await newProject.save()
    res.status(200).json(saveProject)
  } catch (error) {
    res.status(500).json(error)
  }
})


// update Project
router.put("/:id", async (req, res) => {
      try {
        const updateProject = await Project.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        )
        res.status(200).json(updateProject)
      } catch (error) {
        res.status(500).json(error)
      }
})

// delete
router.delete("/:id", async (req, res) => {
      try {
        await Project.findByIdAndDelete(req.params.id)
        res.status(200).json("Project Has been delete!")
      } catch (error) {
        res.status(500).json(error)
      }
})

// get Project byy id
router.get("/:id", async (req, res) => {
  try {
    const Projects = await Project.findById(req.params.id)
    res.status(200).json(Projects)
  } catch (error) {
    res.status(500).json(error)
  }
})

// get all Projects
router.get("/", async (req, res) => {
  console.log("get all projects")
  try {
    const Projects = await Project.find()
    res.status(200).json(Projects)
  } catch (error) {
    res.status(500).json(error)
  }
})

//create Project Donation
router.post("/donation/:id", async (req, res) => {
  const id = req.params.id;
  const newDonation = new Donation(req.body)
  
  try {
    const saveDonation = await newDonation.save()
    console.log(saveDonation._id.toString())
    const updateProject = await Project.findByIdAndUpdate(
      req.params.id, 
      { $push: { donationid: saveDonation._id } },
      { new: true }
  );
   
    console.log(updateProject)
    res.status(200).json(updateProject)
  } catch (error) {
    res.status(500).json(error)
  }
})



module.exports = router
