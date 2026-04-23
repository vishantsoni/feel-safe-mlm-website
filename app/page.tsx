import HeroSection from "@/componants/sections/HeroSection";
import CategorySection from "@/componants/sections/CategorySection";
import NewlyArrivedSection from "@/componants/sections/NewlyArrivedSection";
import TrendingProSection from "@/componants/sections/TrendingProSection";
import MiddleAdsSection from "@/componants/sections/MiddleAdsSection";
import TeamMemberSection from "@/componants/sections/TeamMemberSection";
import DiscountSection from "@/componants/sections/DiscountSection";
import RecentBlogSection from "@/componants/sections/RecentBlogSection";
import DownloadApkSection from "@/componants/sections/DownloadApkSection";
export default function Home() {
  return (
    <>
      <HeroSection />
      {/* <CategorySection /> */}
      {/* <NewlyArrivedSection /> */}
      <TrendingProSection />
      <MiddleAdsSection />
      <TeamMemberSection />
      <DiscountSection />
      <RecentBlogSection />
      <DownloadApkSection />
    </>
  );
}
