const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://namastedev:2kJKgnkFIj8hkbbm@namastenode.wazkbik.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
