'use client'

import { useEffect, useState } from 'react'
type Jobs={
   id :string 
  title :string
  company :string
  location :string
}

export default function Home() {
  const [jobs, setJobs] = useState<Jobs[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    fetch(`http://localhost:5000/api/job?page=${currentPage}&limit=4`)
      .then(res => res.json())
      .then(data => {
        setJobs(data.getAllJob)
        setTotalPages(data.totalPages)
      })
  }, [currentPage])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Jobs</h1>

      <div className="flex flex-col gap-4 mb-6">
        {jobs?.map((job) => (
          <div key={job.id} className="border p-4 rounded-lg">
            <h2 className="font-semibold">{job.title}</h2>
            <p className="text-gray-500">{job.company}</p>
            <p className="text-gray-400">{job.location}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-4 items-center">
        <button
          onClick={() => setCurrentPage(prev => prev - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>Page {currentPage} of {totalPages}</span>

        <button
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}