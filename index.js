
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from './routes/users.js'
import videoRoutes from './routes/videos.js'
import commentRoutes from './routes/comments.js'
import authRoutes from './routes/auth.js'
import cookieParser from "cookie-parser";
import cors from "cors"
import path from 'path'
import url from 'url'

const app = express();
dotenv.config()

const connect = ()=>{
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGODB).then(()=>{
    }).catch((err)=>{
    })
}



app.use(cors({
    origin:['http://localhost:3000'],
    credentials:true
}))

app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/video",videoRoutes);
app.use("/api/comment",commentRoutes);


app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "something went wrong!"
    next();

    return res.status(status).json({
        succsess:status,
        status:status,
        message:message
    });

    
})
export function currDir(fileUrl) {
    const __filename = url.fileURLToPath(fileUrl);
    return path.dirname(__filename);
}
const __dirname = currDir(import.meta.url);
console.log(__dirname)

app.use(express.static(path.join(__dirname, './client/build')))
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})



app.listen(process.env.PORT || 8800,()=>{
    connect()
    console.log(`running setver at ${process.env.PORT || 8800}`)
})
