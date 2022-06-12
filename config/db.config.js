const mongoose = require("mongoose");
const { dbUsername, dbHost, dbName, dbPassword } = require("./index.config");

const connection = async function () {
  const conn = await mongoose.connect(
    `mongodb+srv://${dbUsername}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`
  );
  console.log("Usando: " + conn.connection.host);
};

module.exports = connection;
