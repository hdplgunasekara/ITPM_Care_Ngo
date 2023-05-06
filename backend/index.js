const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//
const authRoute = require("./routes/auth")
const blogRoute = require("./routes/blog")
const projectRoute = require("./routes/projects")
//
dotenv.config()
//connecting the database
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err))

  app.use("/auth", authRoute)
  app.use("/blog", blogRoute)
  app.use("/project", projectRoute)
  
app.listen("5000", () => {
    console.log("backend running...")
  })

  