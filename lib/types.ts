import { Document } from "mongoose";

export interface IPost extends Document {
  postTitle: string;
  name: string;
  enrollmentNo: string;
  department: string;
  batch: string;
  contactNumber?: string;
  category: string;
  talentMedia?: string[];
  githubLink?: string;
  linkedinLink?: string;
  instagramLink?: string;
  youtubeLink?: string;
  facebookLink?: string;
  description: string;
  studentPhoto: string;
  createdAt: Date;
  updatedAt: Date;
}
//comment to push ignore it guys : aaj raat pakistan pe hamla hoga 
