"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Camera, MapPin, Link as LinkIcon, Calendar } from "lucide-react";

interface UserStats {
  posts: number;
  followers: number;
  following: number;
}

interface UserData {
  username: string;
  name: string;
  avatar: string;
  bio: string;
  location: string;
  website: string;
  joinDate: string;
  stats: UserStats;
}

const defaultUserData: UserData = {
  username: "@johndoe",
  name: "John Doe",
  avatar: "/profile-placeholder.jpg",
  bio: "Travel enthusiast | Photography lover | Content Creator",
  location: "New York, USA",
  website: "www.johndoe.com",
  joinDate: "January 2024",
  stats: {
    posts: 245,
    followers: 1420,
    following: 890,
  },
};

const ProfileContent = () => {
  const [mounted, setMounted] = useState(false);
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [activeTab, setActiveTab] = useState<"posts" | "followers" | "following">("posts");

  useEffect(() => {
    setMounted(true);
    try {
      const storedData = localStorage.getItem('userData');
      if (storedData) {
        setUserData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }, []);

  if (!mounted) {
    return null;
  }

  const tabs = [
    { id: "posts", label: "Posts", count: userData.stats.posts },
    { id: "followers", label: "Followers", count: userData.stats.followers },
    { id: "following", label: "Following", count: userData.stats.following },
  ];

  return (
    <div className="mx-auto bg-white rounded-lg shadow">
      {/* Profile Header */}
      <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-lg">
        <div className="absolute -bottom-16 left-8">
          <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
            <Image
              src={userData.avatar}
              alt={userData.name}
              fill
              className="object-cover"
            />
            <button 
              className="absolute bottom-2 right-2 p-1.5 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition-colors"
              onClick={() => {
                // Handle profile picture update
                console.log('Update profile picture');
              }}
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-20 px-8 pb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
            <p className="text-gray-600">{userData.username}</p>
          </div>
          <button 
            onClick={() => {
              // Handle edit profile
              console.log('Edit profile');
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            Edit Profile
          </button>
        </div>

        <p className="text-gray-700 mb-4">{userData.bio}</p>

        <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-6">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{userData.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <LinkIcon className="w-4 h-4" />
            <a
              href={`https://${userData.website}`}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {userData.website}
            </a>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>Joined {userData.joinDate}</span>
          </div>
        </div>

        {/* Stats Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`py-4 px-1 relative ${
                  activeTab === tab.id
                    ? "text-blue-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{tab.label}</span>
                  <span className="text-sm text-gray-500">
                    {tab.count.toLocaleString()}
                  </span>
                </div>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="py-6">
          {activeTab === "posts" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-100 rounded-lg overflow-hidden hover:opacity-75 transition-opacity cursor-pointer"
                >
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Post {i + 1}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "followers" && (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-200" />
                    <div>
                      <p className="font-semibold">Follower {i + 1}</p>
                      <p className="text-sm text-gray-500">@follower{i + 1}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      // Handle remove follower
                      console.log(`Remove follower ${i + 1}`);
                    }}
                    className="px-4 py-1 border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "following" && (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-200" />
                    <div>
                      <p className="font-semibold">Following {i + 1}</p>
                      <p className="text-sm text-gray-500">@following{i + 1}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      // Handle unfollow
                      console.log(`Unfollow user ${i + 1}`);
                    }}
                    className="px-4 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                  >
                    Following
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;