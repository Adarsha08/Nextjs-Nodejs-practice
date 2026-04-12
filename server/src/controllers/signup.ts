import { Request,Response } from "express";
import prisma from '../lib/prisma'
import bcrypt from 'bcrypt'



export const registerUser=async(req:Request,res:Response)=>
{
    try{
     const {name,email,password}=req.body
    //check if the user exist or not 
    const emailCheck=await prisma.user.findUnique({
        where:{
            email
        }
    })
    //send response if the email exist 
    if(emailCheck)
    {
        return res.json({message:"The email already existed "})
    }
    //now hash the password 
    const hashedPassword=await bcrypt.hash(password,10)
    //set the data into the db 
    const addUser=await prisma.user.create({
        data:{
            name,
            email,
            password:hashedPassword
        }
    })
     return res.status(201).json({message:"User Sucessfully Registered"})
    }
    catch(err:any)
    {
        return res.status(500).json({error:err.message})
    }
}

export const userLogin=async(req:Request,res:Response)=>
{
    //using the try catch for good error handling
    const {email,password}=req.body
    //check if the email exist or not 
    const emailCheck=await prisma.user.findUnique({
        where:{
            email
        }
    })
    //check in if 
    if(!emailCheck)
    {
         return res.status(401).json({message:"The email doesnt exist "})
    }
    //check the password 
    const ifMatch= bcrypt.compare(password,emailCheck.password)
    //check with if
    if(!ifMatch)
    {
         return res.json({message:"Incorrect Credentials"})
    }
    return res.status(200).json({message:"Login Sucessful "})


}
