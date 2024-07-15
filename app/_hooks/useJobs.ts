import axios, { CanceledError, CancelTokenSource } from "axios";
import { Job } from "@/services/job-service";
import { useEffect, useState } from "react";

const UseJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [clickedId, setClickedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async (source: CancelTokenSource) => {
    setLoading(true);
    try {
      const response = await axios.get("/api/jobs", {
        headers: {
          "Content-Type": "application/json",
        },
        cancelToken: source.token,
      });

      setJobs(response.data);
      setLoading(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
      } else {
        setError("Error fetching jobs");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getJobs = async () => {
      try {
        await fetchJobs(source);
      } catch (error) {
        if (!(error instanceof CanceledError)) {
          setError("Failed to fetch jobs");
        }
      }
    };

    getJobs();

    return () => {
      source.cancel("Component unmounted, operation canceled.");
    };
  }, []);

  return {
    jobs,
    error,
    loading,
    clickedId,
    setClickedId,
    setLoading,
    setError,
  };
};

export default UseJobs;
