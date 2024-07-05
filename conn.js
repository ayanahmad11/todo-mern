const mongoose = require("mongoose");

const conn = async (req, res) => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://ahmedayaan404:JM0nKVkoaRJOA5Jm@cluster0.nh8k2bp.mongodb.net/"
      )
      .then(() => {
        console.log("Connected");
      });
  } catch (error) {
    console.log(error);
  }
};
conn();