"use client";

// Deterministic gradient color for each avatar, based on the name
const AVATAR_GRADIENTS = [
  "from-indigo-500 to-blue-500",
  "from-fuchsia-500 to-pink-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-violet-500 to-purple-500",
  "from-rose-500 to-red-500",
  "from-cyan-500 to-sky-500",
];

const DEPT_STYLES = {
  "Computer Science": "bg-indigo-50 text-indigo-700 ring-indigo-100",
  "Electrical Engineering": "bg-amber-50 text-amber-700 ring-amber-100",
  "Business Administration": "bg-emerald-50 text-emerald-700 ring-emerald-100",
  Mathematics: "bg-sky-50 text-sky-700 ring-sky-100",
  Physics: "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-100",
  English: "bg-rose-50 text-rose-700 ring-rose-100",
};

function initials(name = "") {
  const parts = name.trim().split(/\s+/);
  return (
    (parts[0]?.[0] || "") + (parts[1]?.[0] || parts[0]?.[1] || "")
  ).toUpperCase();
}

function avatarColor(name = "") {
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return AVATAR_GRADIENTS[sum % AVATAR_GRADIENTS.length];
}

export default function StudentList({ students, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="glass-card rounded-2xl p-6 shadow-sm ring-1 ring-white/60">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="mb-3 flex items-center gap-4 last:mb-0"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-slate-200" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!students.length) {
    return (
      <div className="glass-card flex flex-col items-center justify-center rounded-2xl p-12 text-center shadow-sm ring-1 ring-white/60 animate-fadeIn">
        <div className="mb-3 text-5xl animate-float">🗂️</div>
        <p className="font-medium text-slate-600">No students yet</p>
        <p className="mt-1 text-sm text-slate-400">
          Add your first student using the form on the left.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden rounded-2xl shadow-lg shadow-indigo-500/5 ring-1 ring-white/60 animate-scaleIn">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gradient-to-r from-indigo-50 to-fuchsia-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3.5 font-semibold">#</th>
              <th className="px-4 py-3.5 font-semibold">Student</th>
              <th className="px-4 py-3.5 font-semibold">Phone</th>
              <th className="px-4 py-3.5 font-semibold">Department</th>
              <th className="px-4 py-3.5 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((student, index) => (
              <tr
                key={student._id}
                className="group transition-colors duration-200 hover:bg-indigo-50/40 animate-fadeInUp"
                style={{
                  animationDelay: `${index * 0.06}s`,
                  animationFillMode: "both",
                }}
              >
                <td className="px-4 py-3 text-slate-400">{index + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white shadow-md transition-transform duration-200 group-hover:scale-110 ${avatarColor(
                        student.name
                      )}`}
                    >
                      {initials(student.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-800">
                        {student.name}
                      </p>
                      <p className="truncate text-xs text-slate-400">
                        {student.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600">{student.phone}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${
                      DEPT_STYLES[student.department] ||
                      "bg-slate-50 text-slate-600 ring-slate-100"
                    }`}
                  >
                    {student.department}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(student)}
                      title="Edit"
                      className="rounded-lg bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-200 hover:shadow-sm"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => onDelete(student)}
                      title="Delete"
                      className="rounded-lg bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-200 hover:shadow-sm"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
