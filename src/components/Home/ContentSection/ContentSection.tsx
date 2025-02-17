"use client";
import React, { useState } from "react";
import { Calendar, Clapperboard, ListChecks } from "lucide-react";
import PostModal from "@/srccommon/Modal/PostModal";
import { useGetAllPostsQuery } from "@/srcredux/api/baseApi";
import PostCard from "@/srccommon/Card/PostCard";
import { Spin } from "antd";
import Image from "next/image";

export interface IPost {
  _id: string;
  title?: string;
  content: string;
  image?: string;
  author?: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
  likes?: number;
  comments?: number;
  // Add other properties as needed
}

const ContentSection: React.FC = () => {
  const [openResponsive, setOpenResponsive] = useState(false);

  const { data: getAllPosts, isLoading } = useGetAllPostsQuery(undefined);
  const allPosts = getAllPosts?.data;

  const userImage =
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80";

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <>
      <div className="max-w-2xl w-full space-y-4">
        {/* Create Post */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex space-x-4">
            <Image
              width={64}
              height={50}
              src={userImage}
              alt="User"
              className="w-12 h-12 rounded-full"
            />
            <button
              onClick={() => setOpenResponsive(true)}
              className="flex-1 text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500"
            >
              Start a post, try writing with AI
            </button>
          </div>
          <div className="flex justify-between mt-4 pt-2 border-t">
            <button
              onClick={() => setOpenResponsive(true)}
              className="flex items-center text-gray-600 hover:bg-gray-100 px-3 py-1 rounded"
            >
              <Clapperboard className="w-5 h-5 mr-2" />
              Media
            </button>
            <button
              onClick={() => setOpenResponsive(true)}
              className="flex items-center text-gray-600 hover:bg-gray-100 px-3 py-1 rounded"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Event
            </button>
            <button
              onClick={() => setOpenResponsive(true)}
              className="flex items-center text-gray-600 hover:bg-gray-100 px-3 py-1 rounded"
            >
              <ListChecks className="w-5 h-5 mr-2" />
              Write article
            </button>
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex items-center justify-between">
          <div className="border-t flex-1" />
          <div className="flex items-center mx-4">
            <span className="text-sm text-gray-500">Sort by:</span>
            <button className="ml-2 text-sm font-medium text-gray-700">
              Top ▼
            </button>
          </div>
        </div>

        {/* Posts */}
        {allPosts?.map((post: IPost, index: number) => (
          <PostCard key={index} post={post} />
        ))}
      </div>
      {openResponsive && (
        <PostModal
          setOpenResponsive={setOpenResponsive}
          openResponsive={openResponsive}
        />
      )}
    </>
  );
};

export default ContentSection;
