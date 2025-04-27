import { NextResponse } from "next/server";
 import Post from "@/models/Post";
 import { connectDB } from "@/lib/db";

 export async function GET(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const { id } = params;
      
      await connectDB();
      
      const post = await Post.findById(id);
      
      if (!post) {
        return NextResponse.json(
          { success: false, message: 'Post not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({ success: true, data: post }, { status: 200 });
    } catch (error) {
      console.error('Error fetching post:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to fetch post' },
        { status: 500 }
      );
    }
  }

  export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const { id } = params;
      const body = await request.json();
      
      await connectDB();
      
      // Find the post first
      const existingPost = await Post.findById(id);
      
      if (!existingPost) {
        return NextResponse.json(
          { success: false, message: 'Post not found' },
          { status: 404 }
        );
      }
      
      // Update the post
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { $set: body },
        { new: true, runValidators: true }
      );
      
      return NextResponse.json(
        { success: true, data: updatedPost },
        { status: 200 }
      );
    } catch (error: any) {
      console.error('Error updating post:', error);
      
      // Handle duplicate enrollmentNo error
      if (error.code === 11000) {
        return NextResponse.json(
          { success: false, message: 'A student with this enrollment number already exists' },
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        { success: false, message: 'Failed to update post' },
        { status: 500 }
      );
    }
  }


  export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const { id } = params;
      
      await connectDB();
      
      const deletedPost = await Post.findByIdAndDelete(id);
      
      if (!deletedPost) {
        return NextResponse.json(
          { success: false, message: 'Post not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(
        { success: true, message: 'Post deleted successfully' },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error deleting post:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to delete post' },
        { status: 500 }
      );
    }
  }
  

  