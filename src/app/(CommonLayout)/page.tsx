import ContentSection from "@/srccomponents/Home/ContentSection/ContentSection";
import RightSection from "@/srccomponents/Home/RightSection/RightSection";
import ProfileSidebar from "@/srcshared/SideBar/ProfileSideBar";

export default function Home() {
  return (
    <div className="flex w-[90%] mx-auto mt-32 gap-6">
      <ProfileSidebar />
      <div className="h-[calc(100vh-8rem)] overflow-y-auto flex-1 hide-scrollbar">
        <ContentSection />
      </div>
      <RightSection puzzleGames={[]} suggestions={[]} />
    </div>
  );
}