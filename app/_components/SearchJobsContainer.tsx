"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
//import JobItem from "./JobItem";
import useJobs from "@/app/_hooks/useJobs";

export const SearchJobsContainer = () => {
  const { jobs, error, loading } = useJobs();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleSearch = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = jobs.filter(
      (job) => job.title.toLowerCase().includes(lowerCaseSearchTerm) /**||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(lowerCaseSearchTerm)
        )*/
    );
    setFilteredJobs(filtered);
  };

  return (
    <>
      <div className="border bg-gray-300 rounded-md md:mx-6 h-[15vh] flex items-center justify-center">
        <div className="p-3 flex md:w-[60vw] w-auto">
          <Input
            type="text"
            placeholder="Job Title or Skill"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="font-medium rounded-l-2xl text-gray-400 focus:border-white rounded-r-none"
          />
          <Button
            variant={"outline"}
            className="rounded-r-2xl bg-gray-100 text-gray-300 rounded-l-none"
            onClick={handleSearch}
          >
            <Search />
          </Button>
        </div>
      </div>
    </>
  );
};

export default SearchJobsContainer;
