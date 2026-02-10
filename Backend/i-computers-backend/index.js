import express from 'express';
import mongoose from 'mongoose';
import userRouter from './router/userRouter.js';
import jwt from 'jsonwebtoken';
//import StudentModel from './models/student.js';

//let mongoURI = "mongodb+srv://admin:123better@cluster0.9v7ko7p.mongodb.net/?appName=Cluster0"
//let mongoURI = "mongodb+srv://admin:123better@cluster0.9v7ko7p.mongodb.net/mydb?retryWrites=true&w=majority&appName=Cluster0";
let mongoURI = "mongodb+srv://admin:123better@cluster0.9v7ko7p.mongodb.net/?appName=Cluster0"

/*mongoose.connect(mongoURI).then(
    ()=>{
        console.log("Connected to MongoDB")
    }
)
.catch(
    ( )=>{
        console.log("Error connecting to MongoDB")
    }
)*/

mongoose.connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    console.error(err);        // full error details
  });


let app=express();//create an express app instance.This is a frame work

/*function started(){
    console.log("Server started")
}*/

app.use(express.json()) //middleware to parse JSON bodies,meka middleware ekak,ena request eka piliwelata hadala yawanna mmeken
app.use("/users",userRouter) //middleware to use studentRouter for /students path,users is the collection name

app.use(
    (req,res,next)=>{
        const header = req.header("Authorization") //user kenek request ekak ewaddi token ekak eth ekk ewanawada kiyala balaganna pawichchi karana middleware eka

        if(header != null){
            const token = header.replace("Bearer","")
        }
        console.log(header)
        next()
    }
)


/*app.get("/" ,// get request mostly used to fetch data
    (req,res)=>{ 
        StudentModel.find().then(
            (result)=> {
                res.json(result)
            }
        )     
    }
)

app.post("/" , //post request mostly used to insert data
    (req,res)=>{
        const studentData = new StudentModel({
            name : req.body.name,
            city : req.body.city,
            age : req.body.age
        }

        )
        studentData.save().then(
            ()=>{
            res.json(
                {
                    message : "Student added successfully"
                }
            )
          }   
        )
    }
)

app.delete("/" ,
    (req,res)=>{
        console.log("Delete request recieved")
    }
)*/

app.listen(3000,
    ()=>{
        console.log("server is started")
    }
)