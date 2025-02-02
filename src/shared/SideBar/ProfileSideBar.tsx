"use client";
import React from "react";
import { BarChart2, Calendar, ListChecks, Users } from "lucide-react";

interface ProfileStats {
  viewCount: number;
}

interface ProfileInfo {
  name: string;
  title: string;
  location: string;
  company: string;
  profileImage: string;
}

interface LeftSidebarProps {
  profile: ProfileInfo;
  stats: ProfileStats;
}

const ProfileSidebar: React.FC = () => {
  let profile = {
    name: "John Doe",
    title: "Software Engineer",
    location: "New York, USA",
    company: "Acme Inc.",
    profileImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  console.log(user);

  let stats = {
    viewCount: 100,
  };

  return (
    <div className="w-full max-w-[250px] space-y-4 py-12 border">
      {/* Profile Card */}
      <div className=" rounded-lg shadow overflow-hidden">
        <div className="relative h-20 ">
          {/* Cover image placeholder */}
          <img
            src={profile.profileImage}
            alt={profile.name}
            className="absolute bottom-0 left-4 transform translate-y-1/2 w-16 h-16 rounded-full border-4 "
          />
        </div>
        <div className="pt-12 p-4">
          <h2 className="text-lg font-semibold">
            {user && user.name
              ? `${user.name?.firstName} ${user.name?.lastName}`
              : "John Doe"}
          </h2>
          <p className="text-sm  mt-1">{profile.title}</p>
          <p className="text-xs  mt-1">
            {user && user.address ? user.address : "New York, USA"}
          </p>
          <div className="mt-4">
            <span className="text-xs  font-medium">{profile.company}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="border-t px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-xs ">Profile viewers</span>
            <span className="text-xs font-semibold ">{stats.viewCount}</span>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className=" rounded-lg shadow">
        <nav className="p-2">
          {/* <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
            <BookmarkSimple className="w-4 h-4 mr-3" />
            Saved items
          </a> */}
          <a
            href="#"
            className="flex items-center px-3 py-2 text-sm rounded-md"
          >
            <Users className="w-4 h-4 mr-3" />
            Groups
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-2 text-sm  rounded-md"
          >
            <Calendar className="w-4 h-4 mr-3" />
            Events
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-2 text-sm  rounded-md"
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
