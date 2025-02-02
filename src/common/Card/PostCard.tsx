import { useCreateVoteMutation } from "@/srcredux/api/baseApi";
import { Spin } from "antd";
import { MessageCircle, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import React, { useState } from "react";
import CommentModal from "../Modal/CommentModal";
import Image from "next/image";

interface Post {
  _id: string;
  title?: string;
  content: string;
  images?: string[];
  upvoteCount?: number;
  downvoteCount?: number;
  // Add other properties that your post might have
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [open, setOpen] = useState(false);

  const [createVote, { isLoading }] = useCreateVoteMutation();
  const handleVote = async (voteType: "upvote" | "downvote") => {
    try {
      const userId = "679a521f209a736e170097b6";

      const voteData = {
        userId,
        postId: post._id,
        voteType,
      };

      await createVote(voteData).unwrap();
    } catch (error) {
      console.error("Vote error:", error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex space-x-3">
              <Image
                width={48}
                height={48}
                src="https://avatars.githubusercontent.com/u/121658110?v=4"
                className=" rounded-full"
                alt="User Avatar"
              />
              <div>
                <h3 className="font-medium text-black">Md. Mohabbat Ali</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <span>3h • </span>
                  <span className="ml-1">🌏</span>
                </div>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-500">•••</button>
          </div>

          <div className="mt-3">
            <div className="mb-4">
              <p className="text-gray-800">{post.title || "Group Name"}</p>
              <div className="space-y-2 text-black">
                <p>{post.content}</p>
              </div>
            </div>
            {post.images?.[0] && (
              <div>
                <Image
                  width={500}
                  height={500}
                  src={post.images[0]}
                  alt=""
                  className=" rounded"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-2 border-t">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleVote("upvote")}
              className={`flex items-center px-3 py-1 rounded transition-colors text-black `}
            >
              <ThumbsUp className="w-5 h-5 mr-2" />
              {post?.upvoteCount}
            </button>

            <button
              onClick={() => handleVote("downvote")}
              className={`flex items-center px-3 py-1 rounded transition-colors text-black`}
            >
              <ThumbsDown className="w-5 h-5 mr-2" />
              {post?.downvoteCount}
            </button>
            {isLoading && (
              <div className="flex items-center px-3 py-1 rounded transition-colors text-black">
                <Spin className="w-5 h-5 mr-2 animate-spin" />{" "}
                <p className="text-sm">Submiting...</p>
              </div>
            )}
          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center text-gray-600 hover:bg-gray-100 px-3 py-1 rounded"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Comment
          </button>

          <button className="flex items-center text-gray-600 hover:bg-gray-100 px-3 py-1 rounded">
            <Share2 className="w-5 h-5 mr-2" />
            Share
          </button>
        </div>
      </div>
      {open && <CommentModal open={open} setOpen={setOpen} />}
    </>
  );
};

export default PostCard;
