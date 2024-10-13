import bodyParser from 'body-parser';
import express from 'express';
import userRouter from './routes/userRoutes.js';
import mongoose from 'mongoose';
import galleryItemRouter from './routes/galleryItemRoutes.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config()

//back end server program ek tm app kiynne dan
const app = express()//back end server ek

app.use(bodyParser.json()); //miidlware ekk , ehen en eke body ek hriyta hdnawa

const connectionString = process.env.MONGO_URL;
console.log(connectionString)

app.use((req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (token != null) {
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (decoded != null) {
                req.user = decoded;
                
                next();  // Call next() when the token is valid
            } else {
                res.status(401).json({ message: "Invalid token" }); // Handle invalid token
            }
        });
    } else {
        next();
    }
});

mongoose.connect(connectionString).then(
    () => {
        console.log('Connected to the database...!')
    }
).catch(
    () => {
        console.log('Conntected fail...!')
    }
)

app.use("/api/users", userRouter)
app.use("/api/gallery", galleryItemRouter)


app.listen(5000, (req, res) => {
    console.log("server is running on port 5000")// back-end app ek start un oth function ek run wel consol.log ek display wenna
});
  
