import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Student from "@/models/Student";

// GET /api/students  ->  Read all students
export async function GET() {
  try {
    await connectDB();
    const students = await Student.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: students });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// POST /api/students  ->  Create a new student
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const { name, email, phone, department } = body;
    if (!name || !email || !phone || !department) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    const student = await Student.create({ name, email, phone, department });
    return NextResponse.json(
      { success: true, data: student },
      { status: 201 }
    );
  } catch (error) {
    // Duplicate email
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "A student with this email already exists." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
