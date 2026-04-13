import {Request,Response,NextFunction } from 'express'
import jwt from 'jsonwebtoken'
export const verifyToken=(req:Request,res:Response,next:NextFunction)=>
{
    //first take the header which have the token  
    const token=req.headers.authorization?.split(' ')[1]
    if(!token)
    {
        return res.json({message:"invalid token"})
    }
    try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN!) as { id: string, email: string }
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" })
  }

}