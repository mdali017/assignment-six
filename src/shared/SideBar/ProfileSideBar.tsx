"use client";
import React, { useState, useEffect } from "react";
import { BarChart2, Calendar, Users } from "lucide-react";
import Image from "next/image";

interface UserData {
  name?: {
    firstName: string;
    lastName: string;
  };
  address?: string;
}

const ProfileSidebar: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [mounted, setMounted] = useState(false);

  const profile = {
    name: "John Doe",
    title: "Software Engineer",
    location: "New York, USA",
    company: "Acme Inc.",
    profileImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  };

  const stats = {
    viewCount: 100,
  };

  useEffect(() => {
    setMounted(true);
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }, []);

  if (!mounted) {
    return null; // or a loading spinner
  }

  return (
    <div className="w-full max-w-[250px] space-y-4 py-12 border">
      {/* Profile Card */}
      <div className="rounded-lg shadow overflow-hidden">
        <div className="relative h-20">
          {/* Cover image placeholder */}
          <Image
            width={64}
            height={50}
            src={profile.profileImage}
            alt={
              user?.name
                ? `${user.name.firstName} ${user.name.lastName}`
                : profile.name
            }
            className="absolute bottom-0 left-4 transform translate-y-1/2 rounded-full border-4"
          />
        </div>
        <div className="pt-12 p-4">
          <h2 className="text-lg font-semibold">
            {user?.name
              ? `${user.name.firstName} ${user.name.lastName}`
              : profile.name}
          </h2>
          <p className="text-sm mt-1">{profile.title}</p>
          <p className="text-xs mt-1">{user?.address || profile.location}</p>
          <div className="mt-4">
            <span className="text-xs font-medium">{profile.company}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="border-t px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-xs">Profile viewers</span>
            <span className="text-xs font-semibold">{stats.viewCount}</span>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="rounded-lg shadow">
        <nav className="p-2">
          <a
            href="#"
            className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
          >
            <Users className="w-4 h-4 mr-3" />
            Groups
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
          >
            <Calendar className="w-4 h-4 mr-3" />
            Events
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
          >
            <BarChart2 className="w-4 h-4 mr-3" />
            Analytics
          </a>
        </nav>
      </div>
    </div>
  );
};

export default ProfileSidebar;
