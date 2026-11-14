"use client";

import { useEffect, useState } from "react";

const EMPTY = { name: "", email: "", phone: "", department: "" };

const DEPARTMENTS = [
  "Computer Science",
  "Electrical Engineering",
  "Business Administration",
  "Mathematics",
  "Physics",
  "English",
];

export default function StudentForm({ onSubmit, editingStudent, onCancel }) {
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingStudent) {
      setForm({
        name: editingStudent.name || "",
        email: editingStudent.email || "",
        phone: editingStudent.phone || "",
        department: editingStudent.department || "",
      });
    } else {
      setForm(EMPTY);
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const ok = await onSubmit(form);
    setSubmitting(false);
    if (ok && !editingStudent) setForm(EMPTY);
  };

  const inputClass =
    "peer w-full rounded-xl border border-slate-200 bg-white/80 px-10 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-300 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100";
  const iconClass =
    "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors peer-focus:text-indigo-500";

  return (
    <div className="glass-card sticky top-6 rounded-2xl p-6 shadow-lg shadow-indigo-500/5 ring-1 ring-white/60 transition-all duration-300">
      <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold text-slate-800">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-md transition-all duration-300 ${
            editingStudent
              ? "bg-gradient-to-br from-amber-400 to-orange-500 shadow-amber-500/30"
              : "bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-indigo-500/30"
          }`}
        >
          {editingStudent ? "✏️" : "+"}
        </span>
        {editingStudent ? "Edit Student" : "Add New Student"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Name
          </label>
          <div className="relative">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className={inputClass}
            />
            <span className={iconClass}>👤</span>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
              className={inputClass}
            />
            <span className={iconClass}>✉️</span>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Phone
          </label>
          <div className="relative">
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="+880 1XXX-XXXXXX"
              className={inputClass}
            />
            <span className={iconClass}>📞</span>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Department
          </label>
          <div className="relative">
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              required
              className={`${inputClass} appearance-none cursor-pointer`}
            >
              <option value="">Select a department</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <span className={iconClass}>🏛️</span>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              ▾
            </span>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className={`group relative flex-1 overflow-hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 ${
              editingStudent
                ? "bg-gradient-to-r from-amber-500 to-orange-500 shadow-amber-500/30"
                : "bg-gradient-to-r from-indigo-500 to-fuchsia-500 shadow-indigo-500/30"
            }`}
          >
            <span className="relative z-10">
              {submitting
                ? "Saving..."
                : editingStudent
                ? "Update Student"
                : "Add Student"}
            </span>
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
          </button>
          {editingStudent && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
