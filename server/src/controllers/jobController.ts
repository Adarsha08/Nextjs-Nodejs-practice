import { Request,Response } from "express";
import prisma from "../lib/prisma";

export const getJobs = async (req: Request, res: Response) => {
   try{
    const { page=1, limit=10 } = req.query
    const skip = (Number(page) - 1) * Number(limit)

    const getAllJob=await prisma.job.findMany({
        skip,
        take:Number(limit)
    })
    const total=await prisma.job.count()
    res.json({ getAllJob,total,page:Number(page),  totalPages: Math.ceil(total / Number(limit))})
   }
   catch(err:any)
   {
        res.json({error:err.message})
   }
}
export const postJob=async(req:Request,res:Response)=>
{
    try{
        const {title,company,location}=req.body
        const addJob=await prisma.job.create({
            data:{
                title:title,
                company:company,
                location:location
            }
        })
        res.json({message:"Job added",addJob})
    }
    catch(err:any)
    {
        res.json({error:err.message})
    }
}

export const getById=async(req:Request,res:Response)=>
{
    try{
        const id=req.params.id as string
        const studentById=await prisma.job.findUnique({
            where:{
                id:id
         }
        })
     res.status(200).json(studentById)
    }
    catch(err:any)
    {
        res.json({error:err.message})
    }
}
export const deleteById=async(req:Request,res:Response)=>
{
    try{
        const id=req.params.id as string
        const deletedjob=await prisma.job.delete({
            where:{
                id
            }
        })
        res.status(200).json({deletedjob,message:"Job deleted"})
    }
    catch(err:any)
    {
        res.json({error:err.message})
    }
}

// import prisma from "../lib/prisma"
// import {Request,Response} from 'express'

// export const getSingleJob = async (req:Request, res:Response) => {
//   try {
//     const id= req.params.id as string
//     const job = await prisma.job.findUnique({
//       where: {
//         id // ❌ bug here maybe?
//       }
//     })

//     if (!job) {
//       return res.status(404).json({ message: "Job not found" })
//     }

//     res.json(job)

//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: "Server Error" })
//   }
// }

// import {Request,Response} from 'express'
// import prisma from "../lib/prisma"

// export const getAllJobs = async (req:Request, res:Response) => {
//   try {
//     const jobs = await prisma.job.findMany()

//     // ❌ Bug (async misuse)
//     const titles = jobs.map(async (job) => job.title.toUpperCase())

//     res.json({ jobs, titles })

//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: "Error fetching jobs" })
//   }
// }

// // ----------------------------------

// export const getSingleJob = async (req:Request, res:Response) => {
//   try {
//     const job = await prisma.job.findUnique({
//       where: {
//         id: req.params.jobId as string // ❌ wrong param
//       }
//     })

//     // ❌ possible crash
   
//     if(!job)
//     {
//         return res.json({message:"Job not found "})
//     }
//     const upper = job.title.toUpperCase()
//     res.json({ job, upper })

//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: "Error fetching job" })
//   }
// }

// // ----------------------------------

// export const createJob = async (req:Request, res:Response) => {
//   try {
//     const { title,company,location } = req.body

//     // ❌ Bug: missing validation
//     const job = await prisma.job.create({
//       data: {
//         title:title,
//         company,
//         location
//       }
//     })

//     res.json(job)

//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: "Error creating job" })
//   }
// }   