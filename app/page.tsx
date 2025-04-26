"use client"

import Link from "next/link"
import Image from "next/image"
import { PlusCircle, Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

// Sample data
const students = [
  {
    id: "1",
    name: "Alex Johnson",
    enrollmentNumber: "EN2023001",
    department: "Computer Science",
    batch: "2023",
    contactNumber: "+1 (555) 123-4567",
    category: "Regular",
    profileImage: "/placeholder.svg?height=100&width=100",
    socialMedia: {
      linkedin: "https://linkedin.com/in/alexjohnson",
      twitter: "https://twitter.com/alexjohnson",
      github: "https://github.com/alexjohnson",
    },
  },
  {
    id: "2",
    name: "Sarah Williams",
    enrollmentNumber: "EN2023002",
    department: "Electrical Engineering",
    batch: "2023",
    contactNumber: "+1 (555) 234-5678",
    category: "Regular",
    profileImage: "/placeholder.svg?height=100&width=100",
    socialMedia: {
      linkedin: "https://linkedin.com/in/sarahwilliams",
      twitter: "https://twitter.com/sarahwilliams",
      github: "https://github.com/sarahwilliams",
    },
  },
  {
    id: "3",
    name: "Michael Chen",
    enrollmentNumber: "EN2023003",
    department: "Mechanical Engineering",
    batch: "2023",
    contactNumber: "+1 (555) 345-6789",
    category: "Exchange",
    profileImage: "/placeholder.svg?height=100&width=100",
    socialMedia: {
      linkedin: "https://linkedin.com/in/michaelchen",
      twitter: "https://twitter.com/michaelchen",
      github: "https://github.com/michaelchen",
    },
  },
]

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-blue-700">Student Dashboard</h1>
        <Link href="/create">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <Card
            key={student.id}
            className="overflow-hidden border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <Link href={`/students/${student.id}`}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-blue-200">
                    <Image
                      src={student.profileImage || "/placeholder.svg"}
                      alt={student.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-blue-800 truncate">{student.name}</h3>
                    <p className="text-sm text-blue-600">{student.enrollmentNumber}</p>
                    <p className="text-sm text-blue-500">{student.department}</p>
                    <p className="text-sm text-blue-400">Batch: {student.batch}</p>
                    <p className="text-sm text-blue-400">{student.contactNumber}</p>
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  {student.socialMedia.linkedin && (
                    <a
                      href={student.socialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Linkedin size={18} />
                    </a>
                  )}
                  {student.socialMedia.twitter && (
                    <a
                      href={student.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Twitter size={18} />
                    </a>
                  )}
                  {student.socialMedia.github && (
                    <a
                      href={student.socialMedia.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={18} />
                    </a>
                  )}
                </div>
              </CardContent>
            </Link>
            <CardFooter className="bg-blue-50 px-6 py-3 flex justify-end space-x-2">
              <Link href={`/edit/${student.id}`}>
                <Button
                  variant="outline"
                  className="text-blue-600 border-blue-300 hover:bg-blue-100 hover:text-blue-700"
                >
                  Edit
                </Button>
              </Link>
              <Button variant="ghost" className="text-blue-600 hover:bg-blue-100 hover:text-blue-700">
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
