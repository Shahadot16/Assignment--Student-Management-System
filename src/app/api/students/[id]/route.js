import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Student from "@/models/Student";

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// GET /api/students/:id  ->  Read a single student
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    if (!isValidId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid student id." },
        { status: 400 }
      );
    }

    await connectDB();
    const student = await Student.findById(id);
    if (!student) {
      return NextResponse.json(
        { success: false, message: "Student not found." },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: student });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/students/:id  ->  Update a student
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    if (!isValidId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid student id." },
        { status: 400 }
      );
    }

    await connectDB();
    const body = await request.json();
    const { name, email, phone, department } = body;

    const student = await Student.findByIdAndUpdate(
      id,
      { name, email, phone, department },
      { new: true, runValidators: true }
    );

    if (!student) {
      return NextResponse.json(
        { success: false, message: "Student not found." },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: student });
  } catch (error) {
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

// DELETE /api/students/:id  ->  Delete a student
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    if (!isValidId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid student id." },
        { status: 400 }
      );
    }

    await connectDB();
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return NextResponse.json(
        { success: false, message: "Student not found." },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Student deleted successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
