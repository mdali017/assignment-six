// RightSidebar.tsx
import React from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

interface PuzzleGame {
  name: string;
  description: string;
  icon: string;
}

interface FollowSuggestion {
  name: string;
  title: string;
  image: string;
}

interface RightSidebarProps {
  puzzleGames: PuzzleGame[];
  suggestions: FollowSuggestion[];
}

const RightSection: React.FC<RightSidebarProps> = () => {
  const puzzleGames = [
    {
      name: "Tango",
      description: "Harmonize the grid",
      icon: "/game-icon-1.png",
    },
    // ... add more games
  ];

  const suggestions = [
    {
      name: "Md. Abu Taher",
      title: "JavaScript Developer and Automation Expert",
      image: "/profile-1.jpg",
    },
    // ... add more suggestions
  ];
  return (
    <div className="w-full max-w-xs space-y-4">
      {/* Puzzle Games Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4">
          <h2 className="font-semibold mb-4">Today&apos;s puzzle games</h2>
          <div className="space-y-3">
            {puzzleGames.map((game, index) => (
              <a
                key={index}
                href="#"
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg group"
              >
                <div className="flex items-center space-x-3">
                  <Image
                    width={32}
                    height={32}
                    src={game.icon}
                    alt={game.name}
                    className=" rounded"
                  />
                  <div>
                    <h3 className="font-medium text-sm">{game.name}</h3>
                    <p className="text-xs text-gray-500">{game.description}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Add to your feed */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Add to your feed</h2>
            <button className="text-gray-400 hover:text-gray-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
              </svg>
            </button>
          </div>
          <div className="space-y-4">
            {suggestions?.map((suggestion, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Image
                  width={48}
                  height={48}
                  src={suggestion.image}
                  alt={suggestion.name}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{suggestion.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {suggestion.title}
                  </p>
                  <button className="mt-2 px-4 py-1 border border-gray-500 rounded-full text-sm font-medium hover:bg-gray-50">
                    + Follow
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSection;
