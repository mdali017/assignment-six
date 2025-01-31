import ContentSection from "@/srccomponents/Home/ContentSection/ContentSection";
import RightSection from "@/srccomponents/Home/RightSection/RightSection";
// import RightSection from "@/srccomponents/Home/RightSection/RightSection";
import ProfileSidebar from "@/srcshared/SideBar/ProfileSideBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex w-[90%] mx-auto mt-32 gap-6">
      <ProfileSidebar />
      <ContentSection />
      <RightSection puzzleGames={[]} suggestions={[]} />
    </div>
  );
}
