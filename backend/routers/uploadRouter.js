import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import express from "express";
import { isAuth } from "../utils.js";
import config from "../config.js";

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

aws.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
 });
const s3 = new aws.S3();
const storageS3 = multerS3({
  s3,
  bucket: "surebuy-bucket",
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key(req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadS3 = multer({ storage: storageS3 });
uploadRouter.post("/s3", uploadS3.single("image"), (req, res) => {
  res.send(req.file.location);
});

export default uploadRouter;
