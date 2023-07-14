import express from "express"
import logger from "morgan"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import { connectDatabase } from "./config/database"
import userRoutes from './routes/userRoutes';




dotenv.config()

const app = express();
connectDatabase();



app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(logger('dev'))
app.use('/users', userRoutes)




app.listen(process.env.PORT || 4000, () => {
    console.log(`Listening on port ${process.env.PORT || 4000}`)
})

export default app;

//MHTUXVqcBW7A7s8K

