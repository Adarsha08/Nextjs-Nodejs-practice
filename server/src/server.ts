
import express from 'express'
import cors from 'cors'
import jobRoute from './routes/jobRoute'
const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  
  res.json({ message: 'Server is running' })
})

//if the api is called in the api/note then send it to the routes /jobRoutes  
app.use('/api/job',jobRoute)


app.listen(5000, () => {
  console.log('Server running on port 5000')
})

// const express = require("express")
// const app = express()

// app.use(express.json())

// app.get("/sum", (req, res) => {
//   const a = Number(req.query.a)
//   const b = Number(req.query.b)

//   console.log("Before debugger")

//   debugger  // ⛔ execution will pause here

//   const result = a + b

//   console.log("After debugger")

//   res.json({
//     a,
//     b,
//     result
//   })
// })

// app.listen(3000, () => {
//   console.log("Server running on port 3000")
// })


// server.js

// import express from 'express'
// import prisma from './lib/prisma'

// const app = express()


// app.get("/users/:id", async (req, res) => {
//   try {
//     const job = await prisma.job.findUnique({
//       where: {
//         id :req.params.id as string
//       },

//     })

//     // ❌ Intentional bug
    

//     res.json({
//       job,
    
//     })

//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: "Error" })
//   }
// })

// app.listen(3000, () => {
//   console.log("Server running on port 3000")
// })


// import express from "express"
// import jobRoutes from "./routes/jobRoute"

// const app = express()
// app.use(express.json())

// // ❌ Bug might be here OR not (you decide)
// app.use("/api/jobs", jobRoutes)

// app.listen(3000, () => {
//   console.log("Server running on port 3000")
// })

// import express from "express"
// import jobRoutes from "./routes/jobRoute"

// const app = express()

// app.use(express.json())

// // ❌ Bug might be here
// app.use("/api/job", jobRoutes)

// app.listen(3000, () => {
//   console.log("Server running on port 3000")
// })