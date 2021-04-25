// import dotenv from "dotenv";
import config from './config.js'
import express from "express";
import mongoose from "mongoose";
import path from "path";
import http from "http";
import { Server } from "socket.io";

import orderRouter from "./routers/orderRouter.js";
import productRouter from "./routers/productRouter.js";
import uploadRouter from "./routers/uploadRouter.js";
import userRouter from "./routers/userRouter.js";


// dotenv.config();

const app = express();
//we need to parse the body of the http request
//by adding these two middleware all request to data would be translated
//to the application

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.use("/api/uploads/", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.get("/api/config/paypal", (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});

app.get("/api/config/google", (req, res) => {
  res.send(config.GOOGLE_API_KEY);
});

//path.resolve return current folder, it would be save in the _dirname, then it's used to concatenate the current folder to the uploads folder.
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);
// app.get("/", (req, res) => {
//   res.send("Server is ready");
// });

//this middleware is an error catcher when there is an error in the router using expressAsyncHandler
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

const httpServer = http.Server(app);
const io = new Server(httpServer, { cors: { origin: "*" } });
const users = [];

//io.on is a socket event that runs when there is a new user
io.on("connection", (socket) => {
  console.log("connection", socket.id);
  //a fucntion is needed when a user closes or disconnects from chat browser. first find user by checking socketId with the socket.id parameter
  socket.on("disconnect", () => {
    const user = users.find((x) => x.socketId === socket.id);
    //if user exist then first make that user offline by setting it to false, then it's logged in the terminal
    if (user) {
      user.online = false;
      console.log("Offline", user.name);
      //check if admin exist and user is online then a message is sent to admin
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit("updateUser", user);
      }
    }
  });

  //this would run when there is a new user in the admin chat screen
  socket.on("onLogin", (user) => {
    const updatedUser = {
      ...user,
      online: true,
      socketId: socket.id,
      messages: [],
    };
    //check in the users array we have a user that is equal to the updatedUser
    const existUser = users.find((x) => x._id === updatedUser._id);
    //if that user exist update the socketId and make it online otherwise it is a new user so we need to push that user to the users array
    if (existUser) {
      existUser.socketId = socket.id;
      existUser.online = true;
    } else {
      users.push(updatedUser);
    }
    console.log("Online", user.name);
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      io.to(admin.socketId).emit("updateUser", updatedUser);
    }
    if (updatedUser.isAdmin) {
      io.to(updatedUser.socketId).emit("listUsers", users);
    }
  });

  socket.on("onUserSelected", (user) => {
    //get admin user and make sure admin is online
    const admin = users.find((x) => x.isAdmin && x.online);
    //if admin is online, get the current user and raise selectUser event on admin side
    if (admin) {
      const existUser = users.find((x) => x._id === user._id);
      io.to(admin.socketId).emit("selectUser", existUser);
    }
  });

  //this event happens when there is a new message entered by admin or new user
  socket.on("onMessage", (message) => {
    if (message.isAdmin) {
      //check if the message is from admin, get the user using find function and see if the message was recieved by user on that the user is online
      const user = users.find((x) => x._id === message._id && x.online);
      if (user) {
        //if the reciever of the message exist and online send message to user
        io.to(user.socketId).emit("message", message);
        //push the message to the messages array
        user.messages.push(message);
      }
    } else {
      //if both admin and user are online send message to each party
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit("message", message);
        const user = users.find((x) => x._id === message._id && x.online);
        user.messages.push(message);
      } else {
        io.to(socket.id).emit("message", {
          name: "Admin",
          body: "Sorry. I am not online right now",
        });
      }
    }
  });
});

httpServer.listen(config.PORT, () => {
  console.log(`Serve at http://localhost:${port}`);
});
