import JobsCarousel from "@/components/JobsCarousel";
import { SearchJobsContainer } from "../_components/SearchJobsContainer";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const JobsPage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/");
  }
  return (
    <main>
      <SearchJobsContainer />
      <div className="mt-5">
        <JobsCarousel />
      </div>
    </main>
  );
};

export default JobsPage;
