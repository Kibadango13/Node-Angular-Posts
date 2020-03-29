const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();
//    "mongodb+srv://<username>:<password>@kibadangocluster-wsqh6.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true}

mongoose
  .connect(
    "mongodb://"+ process.env.MONGO_ATLAS_PW +"@kibadangocluster-shard-00-00-wsqh6.mongodb.net:27017,kibadangocluster-shard-00-01-wsqh6.mongodb.net:27017,kibadangocluster-shard-00-02-wsqh6.mongodb.net:27017/test?ssl=true&replicaSet=KibadangoCluster-shard-0&authSource=admin&retryWrites=true&w=majority"
   , {useNewUrlParser: true,useUnifiedTopology: true}
    )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log(err);
  });


  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use("/images", express.static(path.join("backend/images")));
  
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });
  
  app.use("/api/posts", postsRoutes);
  app.use("/api/user", userRoutes);
  
  module.exports = app;
  