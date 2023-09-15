import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import { v2 as cloudinary } from "cloudinary"

import AdminRoutes from "./routes/adminRoutes.js"

dotenv.config()
const app = express()

app.set("view engine", "ejs");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// cloudinary config

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

//connect to db
mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected to db"))
    .catch((err) => console.log(err.message))


app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use("/admin", AdminRoutes)



//listen
app.listen(process.env.PORT, () => {
    console.log(`server running on port:${process.env.PORT}`);
})