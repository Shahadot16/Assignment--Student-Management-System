import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Student Management System",
  description: "A CRUD app built with Next.js, Tailwind CSS, MongoDB & Mongoose",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: "12px",
              background: "#1e293b",
              color: "#fff",
              fontSize: "14px",
            },
            success: { iconTheme: { primary: "#6366f1", secondary: "#fff" } },
          }}
        />
      </body>
    </html>
  );
}
