import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()
const app = express();
const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=> console.log(`Server running on PORT: ${PORT}`))
