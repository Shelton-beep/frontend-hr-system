"use client";
import Loading from "@/app/loading";
import GeneralCard from "@/components/GeneralCard";
import { Button } from "@/components/ui/button";
import { Job } from "@/services/job-service";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const JobDetails = ({ params }: { params: { jobId: string } }) => {
  const router = useRouter();
  const { jobId: id } = params; // Destructure id from params

  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      // Handle the case when id is not available
      setError("Job id is missing");
      console.log(params);
      return;
    }

    const fetchJob = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`/api/jobs/${id}`);
        setJob(response.data); // Assuming response.data contains the job object
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching job:", error);
        setError("Failed to load job details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [id, params]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <p className="error text-red-500 mx-auto justify-center text-center text-2xl p-5">
        {error}
      </p>
    );
  }

  if (!job) {
    return (
      <p className="text-red-500 mx-auto justify-center">Job not found.</p>
    );
  }

  return (
    <main className="w-full flex items-center justify-center">
      <div className="md:w-[90vw] w-full">
        <GeneralCard
          title={job.title}
          jobLocation={job.jobLocation}
          jobType={job.jobType}
          description={job.description}
          iconPresent
        >
          <Button className="md:w-[400px] w-[200px] block mx-auto mt-3 bg-teal-700">
            Apply Now
          </Button>

          <div className="md:m-14 m-5">
            <h1 className="text-center font-bold md:text-2xl mb-3 text-sm">
              Key Outputs
            </h1>
            <ul className="list-disc">
              {job.keyOutputs?.map((keyOutput) => (
                <li
                  className="m-2 md:ml-16 font-serif md:text-lg justify-center"
                  key={keyOutput.id}
                >
                  {keyOutput.outputDescription
                    ? keyOutput.outputDescription
                    : "Job Has No keyOutputs"}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:m-14 m-5">
            <h1 className="text-center font-bold text-sm text-nowrap md:text-2xl mb-3">
              Qualifying Requirements
            </h1>
            <ul className="list-disc">
              {job.requirements?.map((requirement) => (
                <li
                  className="m-2 md:ml-16 font-serif md:text-lg justify-center"
                  key={requirement.id}
                >
                  {requirement.description
                    ? requirement.description
                    : "No Job Requirements"}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:m-14 m-5">
            <h1 className="text-center font-bold md:text-2xl text-sm text-nowrap mb-3">
              Key Competencies and Characteristics
            </h1>
            <ul className="list-disc">
              {job.skills?.map((skill) => (
                <li
                  className="m-2 md:ml-16 font-serif md:text-lg justify-center"
                  key={skill.id}
                >
                  {skill.description ? skill.description : "No skills required"}
                </li>
              ))}
            </ul>
          </div>

          <Button className="md:w-[400px] w-[200px] block mx-auto mt-3 bg-teal-700">
            Apply Now
          </Button>
        </GeneralCard>
      </div>
    </main>
  );
};

export default JobDetails;
