"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Student } from "@/lib/types"

interface StudentCardProps {
  student: Student
  onEdit: () => void
  onDelete: () => void
}

export function StudentCard({ student, onEdit, onDelete }: StudentCardProps) {
  // Using state to track if the card is being clicked for navigation
  // This helps prevent navigation when clicking buttons
  const [isNavigating, setIsNavigating] = useState(false)

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on a button or link
    if ((e.target as HTMLElement).closest("button") || (e.target as HTMLElement).closest("a")) {
      return
    }

    setIsNavigating(true)
  }

  return (
    <Link href={isNavigating ? `/students/${student.id}` : "#"} legacyBehavior>
      <Card
        className="overflow-hidden border border-blue-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        onClick={handleCardClick}
      >
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-blue-200">
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
                onClick={(e) => e.stopPropagation()}
                className="text-blue-500 hover:text-blue-700"
              >
                <Linkedin size={18} />
              </a>
            )}
            {student.socialMedia.twitter && (
              <a
                href={student.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-blue-500 hover:text-blue-700"
              >
                <Twitter size={18} />
              </a>
            )}
            {student.socialMedia.github && (
              <a
                href={student.socialMedia.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-blue-500 hover:text-blue-700"
              >
                <Github size={18} />
              </a>
            )}
          </div>
        </CardContent>

        <CardFooter className="bg-blue-50 px-6 py-3 flex justify-end space-x-2">
          <Button
            variant="outline"
            className="text-blue-600 border-blue-300 hover:bg-blue-100 hover:text-blue-700"
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              onEdit()
            }}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            className="text-blue-600 hover:bg-blue-100 hover:text-blue-700"
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              onDelete()
            }}
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
