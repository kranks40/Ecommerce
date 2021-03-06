import dotenv from "dotenv";

dotenv.config();

export default {
   PORT: process.env.PORT || 5000,
  // MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost/SureBuy",
  // PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || "sb",
  // GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "",
  accessKeyId: process.env.accessKeyId || "accessKeyId",
  secretAccessKey: process.env.secretAccessKey || "secretAccessKey",
};
