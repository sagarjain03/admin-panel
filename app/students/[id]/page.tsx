"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import axios from "axios"

export default function StudentDetail({ params }: { params: { id: string } }) {
  const [student, setStudent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchStudent() {
      try {
        const response = await axios.get(`http://localhost:3000/api/posts/${params.id}`)
        if (response.data.success) {
          setStudent(response.data.data)
        } else {
          setStudent(null)
        }
      } catch (error) {
        console.error("Error fetching student", error)
        setStudent(null)
      } finally {
        setLoading(false)
      }
    }
    fetchStudent()
  }, [params.id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <p className="text-blue-700">Loading...</p>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <p className="text-blue-700">Student not found</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-block mb-6">
        <Button variant="ghost" className="text-blue-600 hover:bg-blue-50">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </Link>

      <div className="flex flex-col items-center mb-8">
        <div className="h-48 w-48 rounded-full overflow-hidden flex justify-center items-center border-4 border-blue-200 mb-4">
          <Image
            src={student.studentPhoto || "/placeholder.svg"}
            alt={student.name}
            width={192}
            height={192}
            className="object-cover cursor-pointer"
            onClick={() => setOpen(true)}
          />

           {/* Full Screen Modal */}
      {open && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 cursor-pointer"
          onClick={() => setOpen(false)}
        >
          <div className="relative">
            <img
              src={student.studentPhoto || "/placeholder.svg"}
              alt="Full Profile" 
              className="max-w-full max-h-full"
            />
            <p className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white text-2xl bg-black bg-opacity-50 px-4 py-2 rounded">
              Click anywhere to close
            </p>
          </div>
        </div>
      )}
        </div>
        <h1 className="text-3xl font-bold text-blue-800">{student.name}</h1>
        <p className="text-xl text-blue-600 mt-1">{student.enrollmentNumber}</p>
      </div>

      <Card className="border-blue-100 shadow-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-blue-700 mb-4">Student Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-blue-500">Department</p>
                  <p className="text-lg text-blue-800">{student.department}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-500">Batch</p>
                  <p className="text-lg text-blue-800">{student.batch}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-500">Category</p>
                  <p className="text-lg text-blue-800">{student.category}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-500">Contact Number</p>
                  <p className="text-lg text-blue-800">{student.contactNumber}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-blue-700 mb-4">Description</h2>
              <p className="text-blue-800 leading-relaxed">{student.description}</p>

              <h2 className="text-xl font-semibold text-blue-700 mt-6 mb-4">Social Media</h2>
              <div className="flex space-x-4">
                {student.socialMedia?.linkedin && (
                  <a
                    href={student.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Linkedin className="mr-2 h-5 w-5" />
                    LinkedIn
                  </a>
                )}
                {student.socialMedia?.twitter && (
                  <a
                    href={student.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Twitter className="mr-2 h-5 w-5" />
                    Twitter
                  </a>
                )}
                {student.socialMedia?.github && (
                  <a
                    href={student.socialMedia.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Github className="mr-2 h-5 w-5" />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
