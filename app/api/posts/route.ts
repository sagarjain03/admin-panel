import { NextResponse } from "next/server";
import Post from "@/models/Post";
import { connectDB } from "@/lib/db";

export async function GET(request: Request) {
  try {
    await connectDB();
    const posts = await Post.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: posts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await connectDB();

    // Validate required fields
    const requiredFields = [
      "name",
      "enrollmentNo",
      "department",
      "batch",
      "contactNumber",
      "category",
      "postTitle",
      "description",
      "studentPhoto",
      "talentMedia",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, message: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // if (!Array.isArray(body.talentMedia) || body.talentMedia.length === 0) {
    //   return NextResponse.json(
    //     { success: false, message: "Talent media is required" },
    //     { status: 400 }
    //   );
    // }

    const post = await Post.create(body);

    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating post:", error);

    // Handle duplicate enrollmentNo error
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "A student with this enrollment number already exists",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to create post" },
      { status: 500 }
    );
  }
}
