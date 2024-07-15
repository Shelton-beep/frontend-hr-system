import JobsCarousel from "@/components/JobsCarousel";
import { SearchJobsContainer } from "./_components/SearchJobsContainer";
import { WhyNssa } from "./_components/WhyNssa";

export default function Home() {
  return (
    <>
      <div className="bg-gray-100">
        <div className="-z-10">
          <div>
            <SearchJobsContainer />
          </div>
          <div className="hidden md:flex items-center justify-center">
            <WhyNssa />
          </div>
          <div className="mt-4 md:mt-8">
            <JobsCarousel />
          </div>
        </div>
      </div>
    </>
  );
}
