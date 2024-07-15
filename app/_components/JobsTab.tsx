"use client";
import GeneralCard from "@/components/GeneralCard";
import { jobVacancyColums } from "../_formSchemas/JobVacancyColums";
import { JobsTable } from "./JobsTable";
import useJobs from "../_hooks/useJobs";
import { DNA } from "react-loader-spinner";
import AddNewJobDialog from "./AddNewJobDialog";

export default function JobsTab() {
  const { jobs, error, loading } = useJobs();

  return (
    <div>
      <GeneralCard
        iconPresent={false}
        title="Job Vacancies"
        description="List of all job Vacancies"
      >
        <div className="flex justify-end items-center">
          <AddNewJobDialog />
        </div>

        {loading && (
          <div className="flex mx-auto justify-center">
            <DNA
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        )}

        {error && (
          <div className="mx-auto flex items-center">
            <p className="text-red-500 text-3xl">
              Failed to load jobs, Something went wrong.Try again later.
            </p>
          </div>
        )}

        {!error && !loading && (
          <JobsTable columns={jobVacancyColums} data={jobs} />
        )}
      </GeneralCard>
    </div>
  );
}
