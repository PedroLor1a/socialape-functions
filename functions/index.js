const functions = require("firebase-functions");
const {
  getAllScreams,
  postScreams,
  getScream,
  commentOnScream,
  unlikeScream,
  likeScream,
  deleteScream,
} = require("./handlers/screams");
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthUser,
} = require("./handlers/users");
const express = require("express");
const FBAuth = require("./util/fbAuth");
const { db } = require("./util/admin");

const app = express();
//screams routes
app.get("/screams", getAllScreams);
app.post("/createScreams", FBAuth, postScreams);
app.get("/scream/:screamId", getScream);
app.post("/scream/:screamId/comment", FBAuth, commentOnScream);
app.get("/scream/:screamId/like", FBAuth, likeScream);
app.get("/scream/:screamId/unlike", FBAuth, unlikeScream);
app.delete("/scream/:screamId", FBAuth, deleteScream);

//users routes
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);
app.post("/newDetails", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthUser);

exports.api = functions.region("southamerica-east1").https.onRequest(app);

exports.createNotificationOnLike = functions
  .region("southamerica-east1")
  .firestore.document("likes/{id}")
  .onCreate((snapshot) => {
    db.doc(`/Screams/${snapshot.data().screamId}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: "like",
            read: false,
            screamId: doc.id,
          });
        }
      })
      .then(() => {
        return;
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });

exports.deleteNotificationOnUnLike = functions
  .region("southamerica-east1")
  .firestore.document("likes/{id}")
  .onDelete((snapshot) => {
    db.doc(`/notifications/${snapshot.id}`)
      .delete()
      .then(() => {
        return;
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });

exports.createNotificationOnComment = functions
  .region("southamerica-east1")
  .firestore.document("comments/{id}")
  .onCreate((snapshot) => {
    db.doc(`/Screams/${snapshot.data().screamId}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: "comment",
            read: false,
            screamId: doc.id,
          });
        }
      })
      .then(() => {
        return;
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });
