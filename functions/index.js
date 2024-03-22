const functions = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const { getAllScreams, postScreams } = require("./handlers/screams");
const { signup, login } = require("./handlers/users");
const express = require("express");
const FBAuth = require("./util/fbAuth");

const app = express();

app.get("/screams", getAllScreams);
app.post("/createScreams", FBAuth, postScreams);

//SignUp Route
app.post("/signup", signup);
app.post("/login", login);

exports.api = functions.region("southamerica-east1").https.onRequest(app);
