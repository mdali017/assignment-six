"use client";
import React, { useState, useRef } from "react";
import { Modal } from "antd";
import { Image as ImageIcon } from "lucide-react";
import { useCreatePostMutation } from "@/srcredux/api/baseApi";
import Swal from "sweetalert2";
// import   from ''

const PostModalProps = {
  openResponsive: false,
  setOpenResponsive: (p0: boolean) => {},
};

const PostModal = ({
  openResponsive,
  setOpenResponsive,
}: typeof PostModalProps) => {
  const [postText, setPostText] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Adventure");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [createPost] = useCreatePostMutation();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files]);

    // Create preview URLs for the new files
    files.forEach((file) => {
      const previewUrl = URL.createObjectURL(file);
      setPreviews((prev) => [...prev, previewUrl]);
    });
  };

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePost = async () => {
    try {
      setIsSubmitting(true);

      // Create FormData object
      const formData = new FormData();

      // Add postData as a JSON string
      const postData = {
        title,
        content: postText,
        author: "679a521f209a736e170097b6", // Replace with actual author ID
        category,
        isPremium: false,
        images: [], // This will be handled by the backend
        upvotes: [],
        upvoteCount: 0,
      };

      formData.append("postData", JSON.stringify(postData));

      // Append files separately
      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });

      // Make API call
      const response = await createPost(formData).unwrap();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your post has been created",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log("Post created successfully:", response);

      // Reset form and close modal on success
      setPostText("");
      setTitle("");
      setSelectedFiles([]);
      setPreviews([]);
      setOpenResponsive(false);
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to create post",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Failed to create post:", error);
      // Handle error (show notification, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex-1 text-center">
            <h2 className="text-xl font-semibold">Create post</h2>
          </div>
        </div>
      }
      centered
      open={openResponsive}
      onCancel={() => setOpenResponsive(false)}
      footer={null}
      width={{
        xs: "90%",
        sm: "80%",
        md: "70%",
        lg: "60%",
        xl: "50%",
        xxl: "40%",
      }}
      className="post-modal"
    >
      <div className="py-4">
        {/* User Info */}
        <div className="flex items-center  w-full gap-5 mb-4">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
            alt="User avatar"
            className="rounded-full "
            style={{ width: "70px", height: "70px", marginRight: "10px" }}
          />
          <div className="">
            <h3 className="font-semibold ">Md.Mohabbat Ali</h3>
            <button className="text-sm bg-gray-100  rounded-md font-medium">
              Software Engineer
            </button>
          </div>
        </div>

        {/* Title Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-lg outline-none"
          />
        </div>

        {/* Post Input */}
        <div className="min-h-40 mb-4 ">
          <textarea
            placeholder="What do you want to talk about?"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            className="w-full min-h-40 resize-none border-none outline-none text-lg placeholder-gray-500 p-4"
          />
        </div>

        {/* Category Selection */}
        <div className="mb-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-lg outline-none"
          >
            <option value="Adventure">Adventure</option>
            <option value="Business Travel">Business Travel</option>
            <option value="Exploration">Exploration</option>
            <option value="Cultural">Cultural</option>
            <option value="Food & Travel">Food & Travel</option>
            <option value="Solo Travel">Solo Travel</option>
          </select>
        </div>

        {/* Image Previews */}
        {previews.length > 0 && (
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-2">
              {previews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between border border-gray-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              multiple
              className="hidden"
            />
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon size={20} />
            </button>
          </div>

          <button
            disabled={!postText.trim() || !title.trim() || isSubmitting}
            className={`px-4 py-2 rounded-full font-medium ${
              postText.trim() && title.trim() && !isSubmitting
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            } transition-colors`}
            onClick={handlePost}
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PostModal;
