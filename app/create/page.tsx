"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// const departments = [
//   "Computer Science",
//   "Electrical Engineering",
//   "Electrical Engineering",
//   "Mechanical Engineering",
//   "Civil Engineering",
//   "Data Science",
//   "Business Administration",
// ];
const departments = ["Information Technology"]; //removed all the other depts and keeping only IT

export default function CreateStudent() {
  const [department, setDepartment] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [media, setMedia] = useState<File[]>([]); // Declare state to store files

  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImage(e.target.files[0]);
  };
 const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   if (e.target.files) {
     const files = Array.from(e.target.files);
     setMedia((prev) => [...prev, ...files]); // Append to avoid overwrite if needed
   }
 };


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
console.log("Image in state:", image);

    if (!image) {
      alert("Please upload a profile image.");
      return;
    } else if (media.length === 0) {
      alert("Please upload talent media.");
      return;
    }
    

    try {
      const formData = new FormData();
      const form = e.currentTarget;
      formData.append("name", form.studentName.value);
      formData.append("enrollmentNo", form.enrollmentNumber.value);
      formData.append("department", department);
      formData.append("batch", form.batch.value);
      formData.append("contactNumber", form.contactNumber.value);
      formData.append("category", form.category.value);
      formData.append("githubLink", form.github.value);
      formData.append("linkedinLink", form.linkedin.value);
      formData.append("instagramLink", form.instagram.value);
      formData.append("youtubeLink", form.youtube.value);
      formData.append("facebookLink", form.facebook.value);
      formData.append("postTitle", form.postTitle.value);
      formData.append("description", form.postDescription.value);
      formData.append("studentPhoto", image);
      // WHEN CLOUDINARY IS SETUP
      media.forEach((file) => {
        formData.append("media[]", file);
      });

      try {
        const uploadResponse = await axios.post("/api/upload", formData);

        const { studentPhoto, media: mediaUrls } = uploadResponse.data;

       const studentData = {
         name: form.studentName.value,
         enrollmentNo: form.enrollmentNumber.value, // ✅ correct mapping
         department,
         batch: form.batch.value,
         contactNumber: form.contactNumber.value,
         category: form.category.value,
         githubLink: form.github.value,
         linkedinLink: form.linkedin.value,
         instagramLink: form.instagram.value,
         youtubeLink: form.youtube.value,
         facebookLink: form.facebook.value,
         postTitle: form.postTitle.value,
         description: form.postDescription.value,
         studentPhoto, // ✅ from Cloudinary or similar
         talentMedia: mediaUrls, // ✅ FIXED key name!
       };



        try {
          const response = await axios.post(
            "http://localhost:3000/api/posts",
            studentData
          );
          if (response.data.success) {
            router.push("/");
          } else {
            alert(response.data.message || "Failed to create post.");
          }
        } catch (error: any) {
          console.error("Error creating post:", error);
          alert(
            error.response?.data?.message ||
              "An error occurred. Please try again."
          );
        }
      } catch (error: any) {
        console.error("Error creating post:", error);
        alert(
          error.response?.data?.message ||
            "An error occurred. Please try again."
        );
      }
    } catch (error: any) {
      console.error("Error creating post:", error);
      alert(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
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
          <CardTitle className="text-2xl text-blue-700">
            Create New Student
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentName" className="text-blue-700">
                  Name <span className="text-red-600 text-xs">*</span>
                </Label>
                <Input
                  id="studentName"
                  name="studentName"
                  className="border-blue-200 focus:border-blue-400"
                  required
                  autoComplete="off"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="enrollmentNumber" className="text-blue-700">
                  Enrollment Number{" "}
                  <span className="text-red-600 text-xs">*</span>
                </Label>
                <Input
                  id="enrollmentNumber"
                  name="enrollmentNumber"
                  className="border-blue-200 focus:border-blue-400"
                  required
                  autoComplete="off"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department" className="text-blue-700">
                  Department <span className="text-red-600 text-xs">*</span>
                </Label>
                <Select onValueChange={(value) => setDepartment(value)}>
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
                  Batch <span className="text-red-600 text-xs">*</span>
                </Label>
                <Input
                  id="batch"
                  name="batch"
                  className="border-blue-200 focus:border-blue-400"
                  required
                  autoComplete="off"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactNumber" className="text-blue-700">
                  Contact Number
                </Label>
                <Input
                  id="contactNumber"
                  name="contactNumber"
                  className="border-blue-200 focus:border-blue-400"
                  required
                  autoComplete="off"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-blue-700">
                  Category <span className="text-red-600 text-xs">*</span>
                </Label>
                <Input
                  id="category"
                  name="category"
                  className="border-blue-200 focus:border-blue-400"
                  required
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-blue-700">Social Media Links: </Label>
              <div className="space-y-1">
                <div>
                  <Label htmlFor="github" className="text-xs text-blue-600">
                    GitHub
                  </Label>
                  <Input
                    id="github"
                    name="github"
                    className="border-blue-200 focus:border-blue-400"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin" className="text-xs text-blue-600">
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    className="border-blue-200 focus:border-blue-400"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <Label htmlFor="instagram" className="text-xs text-blue-600">
                    Instagram
                  </Label>
                  <Input
                    id="instagram"
                    name="instagram"
                    className="border-blue-200 focus:border-blue-400"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <Label htmlFor="youtube" className="text-xs text-blue-600">
                    Youtube
                  </Label>
                  <Input
                    id="youtube"
                    name="youtube"
                    className="border-blue-200 focus:border-blue-400"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <Label htmlFor="facebook" className="text-xs text-blue-600">
                    Facebook
                  </Label>
                  <Input
                    id="facebook"
                    name="facebook"
                    className="border-blue-200 focus:border-blue-400"
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="postTitle" className="text-blue-700">
                Title <span className="text-red-600 text-xs">*</span>
              </Label>
              <Input
                id="postTitle"
                name="postTitle"
                className="border-blue-200 focus:border-blue-400"
                required
                autoComplete="off"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postDescription" className="text-blue-700">
                Description <span className="text-red-600 text-xs">*</span>
              </Label>
              <Textarea
                id="postDescription"
                name="postDescription"
                className="min-h-[100px] border-blue-200 focus:border-blue-400"
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image" className="text-blue-700">
                Student Photo <span className="text-red-600 text-xs">*</span>
              </Label>
              <Input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                required
                autoComplete="off"
              />
            </div>

            {
              // WHEN CLOUDINARY IS SETUP
              <div className="space-y-2">
                <Label htmlFor="media" className="text-blue-700">
                  Student Talent Media{" "}
                  <span className="text-red-600 text-xs">*</span>
                </Label>
                <Input
                  type="file"
                  id="media"
                  name="media"
                  onChange={handleMediaChange}
                  multiple
                  accept="image/*, video/*, application/pdf, application/msword, application/vnd.ms-excel"
                  required
                  autoComplete="off"
                />
              </div>
            }

            <CardFooter className="flex justify-end space-x-2 p-0">
              <Link href="/">
                <Button
                  variant="outline"
                  className="text-blue-600 border-blue-300 hover:bg-blue-100"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white"
              >
                Create
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
