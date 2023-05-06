const router = require("express").Router()
const Blog = require("../model/blog")

//create blog
router.post("/", async (req, res) => {
  const newBlog = new Blog(req.body)
  try {
    const saveBlog = await newBlog.save()
    res.status(200).json(saveBlog)
  } catch (error) {
    res.status(500).json(error)
  }
})


// update blog
router.put("/:id", async (req, res) => {
      try {
        const updateBlog = await Blog.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        )
        res.status(200).json(updateBlog)
      } catch (error) {
        res.status(500).json(error)
      }
})

// delete
router.delete("/:id", async (req, res) => {
      try {
        await Blog.findByIdAndDelete(req.params.id)
        res.status(200).json("Blog Has been delete!")
      } catch (error) {
        res.status(500).json(error)
      }
})

// get blog byy id
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    res.status(200).json(blog)
  } catch (error) {
    res.status(500).json(error)
  }
})

// get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find()
    res.status(200).json(blogs)
  } catch (error) {
    res.status(500).json(error)
  }
})


module.exports = router
