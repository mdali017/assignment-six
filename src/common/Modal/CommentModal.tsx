import React, { useState } from "react";
import { Button, Drawer } from "antd";

interface CommentModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

const CommentModal: React.FC<CommentModalProps> = ({
  open,
  setOpen,
}: CommentModalProps) => {
  const [showForm, setShowForm] = useState(false);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "John Doe",
      content: "This is a great post! Thanks for sharing.",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      author: "Jane Smith",
      content: "Very informative content. Looking forward to more.",
      timestamp: "1 hour ago",
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const onClose = () => {
    setOpen(false);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: comments.length + 1,
      author: "Current User",
      content: newComment,
      timestamp: "Just now",
    };

    setComments([...comments, comment]);
    setNewComment("");
    setShowForm(false);
  };

  return (
    <>
      <Drawer title="Comment Title" onClose={onClose} open={open}>
        <div className="flex flex-col h-full">
          {/* Comments List Section */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  style={{ backgroundColor: "black", color: "white" }}
                  className="bg-green-700 border rounded-xl p-4 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold ">{comment.author}</h3>
                    <span className="text-sm ">{comment.timestamp}</span>
                  </div>
                  <p className="">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Fixed Bottom Section */}
          <div className="border-t bg-white mt-auto">
            {showForm ? (
              <div className="p-4">
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-black font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                  Add Comment
                </button>
              </div>
            ) : (
              <div className="p-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-3 border  rounded-xl  min-h-[100px] resize-none"
                    placeholder="Write your comment here..."
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-black font-semibold py-2 px-4 rounded-lg transition duration-200"
                    >
                      Post Comment
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default CommentModal;
