import multer from "multer";
import express from "express";
import { isAuth } from "../utils.js";

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

//upload is a middleware used in uploadRouter where the file would be uploaded to the uploads folder located on the harddrive and the name of the file would have the current date ednding in jpg
const upload = multer({ storage });

uploadRouter.post("/", isAuth, upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default uploadRouter;
