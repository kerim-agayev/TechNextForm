"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StudentDashboard from "@/components/dashboard/main/StudentDashboard";
import { Spin } from "antd";

const DashPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem("accessToken");

    if (!token) {
      // Redirect to login page if the token is not present
      router.push("/login");
    } else {
      // Allow the component to render
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    // Show a spinner while checking authentication
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin />
      </div>
    );
  }

  return (
    <div>
      <StudentDashboard />
    </div>
  );
};

export default DashPage;
