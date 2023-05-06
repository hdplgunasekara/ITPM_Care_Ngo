const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: false,
    },
    isdonation: {
      type: Boolean,
      require: true,
    },
    donationid: [{
    type: mongoose.Schema.Types.ObjectId,
		required: false,
		ref: "Donation",
    }],
  },
  { timestamps: true }
)
module.exports = mongoose.model("Project", ProjectSchema)
