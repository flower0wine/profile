import { getAllBlogs } from "@/lib/blog";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const blogs = await getAllBlogs();
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
