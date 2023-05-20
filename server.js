import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import userRouter from "./src/routes/user-routes.js"
import contactRouter from "./src/routes/contact-routes.js"
import "./src/config/db.connection.js"

dotenv.config()
const app = express();
const PORT = process.env.PORT || 3001;

//MIDDLEWARES
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/user", userRouter)
app.use("/contacts", contactRouter)

app.listen(PORT, ()=> console.log(`Server running on PORT: ${PORT}`))