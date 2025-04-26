import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data - in a real app, this would come from an API or database
const students = [
  {
    id: "1",
    name: "Alex Johnson",
    enrollmentNumber: "EN2023001",
    department: "Computer Science",
    batch: "2023",
    contactNumber: "+1 (555) 123-4567",
    category: "Regular",
    description: "Passionate about AI and machine learning.",
    profileImage: "/placeholder.svg?height=300&width=300",
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
    description: "Interested in renewable energy systems.",
    profileImage: "/placeholder.svg?height=300&width=300",
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
    description: "Focused on robotics and automation.",
    profileImage: "/placeholder.svg?height=300&width=300",
    socialMedia: {
      linkedin: "https://linkedin.com/in/michaelchen",
      twitter: "https://twitter.com/michaelchen",
      github: "https://github.com/michaelchen",
    },
  },
]

const departments = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Data Science",
  "Business Administration",
]

export default function EditStudent({ params }: { params: { id: string } }) {
  // Find the student with the matching ID
  const student = students.find((s) => s.id === params.id)

  // If no student is found, show a message
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

      <Card className="max-w-3xl mx-auto border-blue-100">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-700">Edit Student</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-blue-700">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={student.name}
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
                  defaultValue={student.enrollmentNumber}
                  className="border-blue-200 focus:border-blue-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department" className="text-blue-700">
                  Department
                </Label>
                <Select defaultValue={student.department}>
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
                  defaultValue={student.batch}
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
                  defaultValue={student.contactNumber}
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
                  defaultValue={student.category}
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
                    defaultValue={student.socialMedia.linkedin}
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
                    defaultValue={student.socialMedia.twitter}
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
                    defaultValue={student.socialMedia.github}
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
                defaultValue={student.description}
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
                defaultValue={student.profileImage}
                className="border-blue-200 focus:border-blue-400"
                placeholder="URL or upload image"
              />
              <p className="text-xs text-blue-500">Note: In a production app, this would be a file upload component</p>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Link href="/">
            <Button variant="outline" className="text-blue-600 border-blue-300 hover:bg-blue-100">
              Cancel
            </Button>
          </Link>
          <Link href="/">
            <Button className="bg-blue-700 hover:bg-blue-800 text-white">Update</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
