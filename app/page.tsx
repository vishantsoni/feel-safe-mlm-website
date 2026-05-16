import HeroSection from "@/componants/sections/HeroSection";
import CategorySection from "@/componants/sections/CategorySection";
import NewlyArrivedSection from "@/componants/sections/NewlyArrivedSection";
import TrendingProSection from "@/componants/sections/TrendingProSection";
import MiddleAdsSection from "@/componants/sections/MiddleAdsSection";
import TeamMemberSection from "@/componants/sections/TeamMemberSection";
import DiscountSection from "@/componants/sections/DiscountSection";
import RecentBlogSection from "@/componants/sections/RecentBlogSection";
import DownloadApkSection from "@/componants/sections/DownloadApkSection";
import BreadkingBarier from "@/componants/sections/BreadkingBarier";
import FeelSafeFeatures from "@/componants/sections/FeelSafeFeatures";
import MissionSection from "@/componants/sections/MissionSection";
export default function Home() {
  return (
    <>
      <HeroSection />
      {/* <CategorySection /> */}
      {/* <NewlyArrivedSection /> */}
      <MissionSection />
      <div className="w-100 mt-5 section21 d-lg-none" style={{ minHeight: "50vh", backgroundPosition: "right" }}>
      </div>

      <MiddleAdsSection />
      <TrendingProSection />
      <div className="w-100 mt-5" data-aos="zoom-in-up">
        <img src={"/assets/banner/eco.png"} className="img-fluid w-100" />
      </div>
      <BreadkingBarier />
      <TeamMemberSection />
      <FeelSafeFeatures />
      <DiscountSection />
      <RecentBlogSection />
      <DownloadApkSection />
    </>
  );
}
