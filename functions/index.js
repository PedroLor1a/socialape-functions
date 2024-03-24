const functions = require("firebase-functions");
const { getAllScreams, postScreams } = require("./handlers/screams");
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthUser,
} = require("./handlers/users");
const express = require("express");
const FBAuth = require("./util/fbAuth");

const app = express();

app.get("/screams", getAllScreams);
app.post("/createScreams", FBAuth, postScreams);
app.post("/user/image", FBAuth, uploadImage);
app.post("/newDetails", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthUser);

//SignUp Route
app.post("/signup", signup);
app.post("/login", login);

exports.api = functions.region("southamerica-east1").https.onRequest(app);
