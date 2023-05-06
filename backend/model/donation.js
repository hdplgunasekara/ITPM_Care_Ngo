const mongoose = require("mongoose")

const DonationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    contact: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
      require: true,
    },
    amount: {
      type: Number,
      require: true,
    },
    reason: {
      type: String,
      require: true,
    },
    image : {
        type: String,
        require: false,
    },
  },
  { timestamps: true }
)
module.exports = mongoose.model("Donation", DonationSchema)
