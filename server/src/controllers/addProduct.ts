import prisma from '../lib/prisma'
import { Request,Response } from 'express'

export const addProduct=async(req:Request,res:Response)=>
{
    try{
        const {name,price,description}=req.body
        const userId =req.user!.id
        if(!name||!price||!description)
        {
            return res.json({message:"The field should not be empty "})
        }
        const addedProduct=await prisma .product.create({
            data:{
                name,
                price,
                description,
                userId
            }
        })
        return res.status(201).json({message:"data added",addedProduct })
    }
    catch(err:any)
    {
        console.log(err)
        return res.status(500).json({message:err.message})
       
    }
}