"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Student } from "@/lib/types"

interface StudentModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (student: Student) => void
  student: Student | null
}

const emptyStudent: Student = {
  id: "",
  name: "",
  enrollmentNumber: "",
  department: "",
  batch: "",
  contactNumber: "",
  category: "",
  description: "",
  profileImage: "/placeholder.svg?height=200&width=200",
  socialMedia: {
    linkedin: "",
    twitter: "",
    github: "",
  },
}

const departments = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Data Science",
  "Business Administration",
]

export function StudentModal({ isOpen, onClose, onSave, student }: StudentModalProps) {
  const [formData, setFormData] = useState<Student>(emptyStudent)

  useEffect(() => {
    if (student) {
      setFormData(student)
    } else {
      setFormData(emptyStudent)
    }
  }, [student, isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSocialMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [name]: value,
      },
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      department: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-blue-700">{student ? "Edit Student" : "Create New Student"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-blue-700">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border-blue-200 focus:border-blue-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="enrollmentNumber" className="text-blue-700">
                Enrollment Number
              </Label>
              <Input
                id="enrollmentNumber"
                name="enrollmentNumber"
                value={formData.enrollmentNumber}
                onChange={handleChange}
                className="border-blue-200 focus:border-blue-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department" className="text-blue-700">
                Department
              </Label>
              <Select value={formData.department} onValueChange={handleSelectChange}>
                <SelectTrigger className="border-blue-200 focus:border-blue-400">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="batch" className="text-blue-700">
                Batch
              </Label>
              <Input
                id="batch"
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                className="border-blue-200 focus:border-blue-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactNumber" className="text-blue-700">
                Contact Number
              </Label>
              <Input
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="border-blue-200 focus:border-blue-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-blue-700">
                Category
              </Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="border-blue-200 focus:border-blue-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-blue-700">Social Media Links</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="linkedin" className="text-sm text-blue-600">
                  LinkedIn
                </Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  value={formData.socialMedia.linkedin}
                  onChange={handleSocialMediaChange}
                  className="border-blue-200 focus:border-blue-400"
                />
              </div>
              <div>
                <Label htmlFor="twitter" className="text-sm text-blue-600">
                  Twitter
                </Label>
                <Input
                  id="twitter"
                  name="twitter"
                  value={formData.socialMedia.twitter}
                  onChange={handleSocialMediaChange}
                  className="border-blue-200 focus:border-blue-400"
                />
              </div>
              <div>
                <Label htmlFor="github" className="text-sm text-blue-600">
                  GitHub
                </Label>
                <Input
                  id="github"
                  name="github"
                  value={formData.socialMedia.github}
                  onChange={handleSocialMediaChange}
                  className="border-blue-200 focus:border-blue-400"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-blue-700">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="min-h-[100px] border-blue-200 focus:border-blue-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profileImage" className="text-blue-700">
              Profile Image URL
            </Label>
            <Input
              id="profileImage"
              name="profileImage"
              value={formData.profileImage}
              onChange={handleChange}
              className="border-blue-200 focus:border-blue-400"
              placeholder="URL or upload image"
            />
            <p className="text-xs text-blue-500">Note: In a production app, this would be a file upload component</p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="text-blue-600 border-blue-300 hover:bg-blue-100"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white">
              {student ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
