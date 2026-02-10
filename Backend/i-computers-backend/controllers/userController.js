import userModel from "../models/user.js"
import bcrypt from "bcrypt";//import bcrypt for password hashing
import jwt from "jsonwebtoken";//import jwt for token generation

export function createUser(req,res){
    const hashedPassword = bcrypt.hashSync(req.body.password,12)//hash the password with 12 salt rounds
    
    const userdata = new userModel({//userData is the instance of userModel
        email : req.body.email,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        password : hashedPassword,

    })


    userdata.save().then(
        ()=>{
            res.json({
                message : "User created successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message : "Error creating user"
            })
        }
    )

}

export function loginUser(req,res){

    userModel.findOne(
        {
            email : req.body.email
        }
    ).then(
        (user)=>{
            if(user==null){
                res.json(
                    {
                        message : "User with given email not found"
                    }
                )
            }else{
                const isPasswordValid = bcrypt.compareSync(req.body.password,user.password)
                console.log(isPasswordValid)

                if(isPasswordValid){

                    const token = jwt.sign({
                        email : user.email,
                        firstName : user.firstName,
                        lastName : user.lastName,
                        role : user.role,
                        image : user.image,
                        isEmailVerified : user.isEmailVerified
                    },"I-computers-54")

                    res.json(
                        {
                            message : "Login successful"
                        }
                    )
                }else{
                    res.json(
                        {
                            message : "Invalid password"
                        }
                    )
                }
            }
        }
    )
}