"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import StudentForm from "@/components/StudentForm";
import StudentList from "@/components/StudentList";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingStudent, setEditingStudent] = useState(null);

  // READ — fetch all students
  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/students");
      const json = await res.json();
      if (json.success) setStudents(json.data);
      else toast.error(json.message || "Failed to load students.");
    } catch {
      toast.error("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // CREATE / UPDATE
  const handleSubmit = async (form) => {
    const isEdit = Boolean(editingStudent);
    const url = isEdit
      ? `/api/students/${editingStudent._id}`
      : "/api/students";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();

      if (json.success) {
        toast.success(
          isEdit ? "Student updated successfully." : "Student added successfully."
        );
        setEditingStudent(null);
        fetchStudents();
        return true;
      }
      toast.error(json.message || "Something went wrong.");
      return false;
    } catch {
      toast.error("Could not connect to the server.");
      return false;
    }
  };

  // DELETE
  const handleDelete = async (student) => {
    if (!confirm(`Delete "${student.name}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/students/${student._id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Student deleted.");
        if (editingStudent?._id === student._id) setEditingStudent(null);
        fetchStudents();
      } else {
        toast.error(json.message || "Failed to delete.");
      }
    } catch {
      toast.error("Could not connect to the server.");
    }
  };

  const departments = new Set(students.map((s) => s.department)).size;

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-10">
      {/* Decorative animated background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-300/40 blur-3xl animate-float" />
        <div
          className="absolute -right-20 top-40 h-80 w-80 rounded-full bg-fuchsia-300/40 blur-3xl animate-float"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-sky-300/40 blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="mx-auto max-w-5xl">
        <header className="mb-10 text-center animate-fadeInUp">
          <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-3xl shadow-lg shadow-indigo-500/30 animate-float">
            🎓
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight gradient-text">
            Student Management System
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Create, read, update and delete students — Next.js · Tailwind ·
            MongoDB · Mongoose
          </p>
        </header>

        {/* Stat cards */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 animate-fadeInUp">
          <StatCard label="Total Students" value={students.length} icon="👥" />
          <StatCard label="Departments" value={departments} icon="🏛️" />
          <StatCard
            label="Status"
            value={loading ? "Loading" : "Live"}
            icon="⚡"
            className="col-span-2 sm:col-span-1"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div
            className="lg:col-span-1 animate-fadeInUp"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            <StudentForm
              onSubmit={handleSubmit}
              editingStudent={editingStudent}
              onCancel={() => setEditingStudent(null)}
            />
          </div>

          <div
            className="lg:col-span-2 animate-fadeInUp"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">
                All Students
              </h2>
              <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-indigo-600 ring-1 ring-indigo-100">
                Total: {students.length}
              </span>
            </div>
            <StudentList
              students={students}
              loading={loading}
              onEdit={setEditingStudent}
              onDelete={handleDelete}
            />
          </div>
        </div>

        <footer className="mt-12 text-center text-xs text-slate-400">
          Built with ❤️ using Next.js, Tailwind CSS, MongoDB & Mongoose
        </footer>
      </div>
    </main>
  );
}

function StatCard({ label, value, icon, className = "" }) {
  return (
    <div
      className={`glass-card flex items-center gap-3 rounded-2xl p-4 shadow-sm ring-1 ring-white/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${className}`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10 text-xl">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p className="text-xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
}
