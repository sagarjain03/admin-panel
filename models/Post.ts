import mongoose, { Schema, Document } from "mongoose";
import { IPost } from "@/lib/types";

const postSchema: Schema<IPost> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    enrollmentNo: {
      type: String,
      required: [true, "Enrollment number is required"],
      unique: true,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
    },
    batch: {
      type: String,
      required: [true, "Batch is required"],
    },
    contactNumber: {
      type: String,
    },
    category: {
      type: String,
      // enum: ['Singing', 'Dancing', 'Painting', 'Gaming', 'Standup', 'Others'],
      required: [true, "Category is required"],
    },
    githubLink: {
      type: String,
    },
    linkedinLink: {
      type: String,
    },
    instagramLink: {
      type: String,
    },
    youtubeLink: {
      type: String,
    },
    facebookLink: {
      type: String,
    },
    postTitle: {
      type: String,
      required: [true, "Post title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    studentPhoto: {
      type: String,
      required: [true, "Student photo is required"],
    },
    talentMedia: {
      type: [String], //images or videos
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
