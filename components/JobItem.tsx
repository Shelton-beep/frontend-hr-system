"use client";

// Import necessary components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import logo from "../public/assets/logo.png";
import Image from "next/image";
import { ImLocation2 } from "react-icons/im";
import { LiaIndustrySolid } from "react-icons/lia";
import { cn } from "@/lib/utils";
import { SkeletonLoader } from "./SkeletonLoader";
import useJobs from "@/app/_hooks/useJobs";
import { useRouter } from "next/navigation";

// Helper function to calculate time difference
const timeAgo = (dateString: string) => {
  const timeDiff = new Date().getTime() - new Date(dateString).getTime();
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(timeDiff / (1000 * 60));
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));

  if (months > 0) {
    return `${months} ${months > 1 ? "months" : "month"} ago`;
  } else if (days > 0) {
    return `${days} ${days > 1 ? "days" : "day"} ago`;
  } else if (hours > 0) {
    return `${hours} ${hours > 1 ? "hours" : "hour"} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes > 1 ? "minutes" : "minute"} ago`;
  } else {
    return `${seconds} ${seconds > 1 ? "seconds" : "second"} ago`;
  }
};

// JobItem component
const JobItem = () => {
  const { jobs, error, loading, clickedId } = useJobs();

  const router = useRouter();

  return (
    <>
      {error && (
        <p className="text-red-500 font-medium text-xl mx-auto flex items-center justify-center">
          {error}
        </p>
      )}
      {loading && <SkeletonLoader />}

      <div className="flex flex-col items-center">
        {!loading &&
          jobs.map(
            (job) =>
              job.isActive && (
                <Card
                  key={job.id}
                  className={`m-2 border-0 shadow-md p-0 cursor-pointer border-gray-400 hover:border-teal-700 hover:border-4 hover:m-6 w-[90vw] md:w-[80vw] h-auto md:h-[200px] ${
                    clickedId === job.id ? "border-blue-400" : ""
                  }`}
                  onClick={() => router.push(`/jobs/${job.id}`)}
                >
                  <CardHeader>
                    <CardTitle className="justify-between flex items-center hover:underline text-sm">
                      <div className="flex justify-between w-full items-center space-y-4">
                        <span
                          style={{
                            maxHeight: "3rem",
                            WebkitLineClamp: 2,
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                          }}
                          className="font-bold md:text-2xl text-lg"
                        >
                          {job.title}
                        </span>
                        <span className="hidden md:flex">
                          <div className="flex flex-col md:flex-row">
                            <div className="flex gap-2 md:p-2 items-center justify-start">
                              <ImLocation2 className="text-green-700" />
                              <CardDescription>
                                {job.jobLocation}
                              </CardDescription>
                            </div>
                            <div className="flex gap-2 md:p-2 p-1 items-center justify-start">
                              <LiaIndustrySolid
                                className={cn(
                                  `text-green-700`,
                                  job.jobType === "Permanent" && "text-blue-700"
                                )}
                              />
                              <CardDescription
                                className={cn(
                                  ` bg-green-200 px-3 text-green-800 rounded-md`,
                                  job.jobType === "Permanent" &&
                                    "bg-blue-200 text-blue-800"
                                )}
                              >
                                {job.jobType}
                              </CardDescription>
                            </div>
                          </div>
                        </span>
                        <span>
                          <Image
                            src={logo}
                            alt="Nssa Logo"
                            width={40}
                            height={40}
                          />
                        </span>
                      </div>
                    </CardTitle>

                    <div className="flex md:hidden">
                      <div className="flex gap-2 md:p-2 items-center justify-start">
                        <ImLocation2 className="text-green-700" />
                        <CardDescription>{job.jobLocation}</CardDescription>
                      </div>
                      <div className="flex gap-2 md:p-2 p-1 items-center justify-start">
                        <LiaIndustrySolid
                          className={cn(
                            `text-green-700`,
                            job.jobType === "Permanent" && "text-blue-700"
                          )}
                        />
                        <CardDescription
                          className={cn(
                            ` bg-green-200 px-3 text-green-800 rounded-md`,
                            job.jobType === "Permanent" &&
                              "bg-blue-200 text-blue-800"
                          )}
                        >
                          {job.jobType}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p
                      className="overflow-hidden text-sm font-medium text-gray-700"
                      style={{
                        maxHeight: "3rem",
                        WebkitLineClamp: 2,
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {job.description}
                    </p>
                  </CardContent>

                  <CardFooter className="justify-between">
                    <p>{timeAgo(job.createdAt)}</p>

                    <h5
                      className={cn(
                        `text-sm p-1 rounded-md text-blue-800 px-3`,
                        job?.applicationDeadline?.toString().split("T")[0]! <
                          new Date().toISOString().split("T")[0]
                          ? "text-red-500 bg-red-200"
                          : "text-green-500 bg-green-200"
                      )}
                    >
                      {job?.applicationDeadline?.toString().split("T")[0]! <
                      new Date().toISOString().split("T")[0]
                        ? "Closed "
                        : `Closing ${
                            job?.applicationDeadline?.toString().split("T")[0]
                          }  `}
                    </h5>
                  </CardFooter>
                </Card>
              )
          )}
      </div>
    </>
  );
};

export default JobItem;
