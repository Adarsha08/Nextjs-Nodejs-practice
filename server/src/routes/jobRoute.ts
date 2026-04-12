import express from 'express'
import { Router } from 'express'
import {deleteById, getById, getJobs, postJob} from '../controllers/jobController'
const router=Router()


router.get('/',getJobs)
router.post('/',postJob)
router.get('/:id',getById)
router.delete('/:id',deleteById)
export default router

// import express from "express"
// import { getSingleJob } from "../controllers/jobController"

// const router = express.Router()

// // ❌ Something subtle here
// router.get("/job/:id", getSingleJob)

// export default router


// import express from "express"
// import { getAllJobs, getSingleJob, createJob } from "../controllers/jobController"

// const router = express.Router()

// // ❌ Subtle bugs here
// router.get("/jobs", getAllJobs)
// router.get("/job/:id", getSingleJob)
// router.post("/job", createJob)

// export default router