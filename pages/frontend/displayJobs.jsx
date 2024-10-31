import NavBar from "@/components/NavBar";
import React from "react";
import JobsCard from "@/components/JobsCard";
import { get_job } from "@/Services/job";
import useSWRInfinite from "swr/infinite";

export default function DisplayJobs() {
  const { data, mutate, size, setSize, isValidating, isLoading } =
    useSWRInfinite(
      (pageIndex) => {
        return `/api/job/getAllJobs?pageIndex=${pageIndex}`;
      },
      (url) => {
        const { data } = get_job(url);
        return data;
      }
    );
  const jobs = data ? [].concat(...data) : [];

  return (
    <>
      <NavBar />
      <div className="w-full  py-20 flex items-center md:px-8 px-2  justify-center flex-col ">
        <h1 className="px-4 mx-2 py-2 mt-8 mb-4 leading-relaxed uppercase tracking-wider border-b-2 border-b-indigo-600 text-3xl font-semibold">
          Available Jobs
        </h1>
        <div className="w-full h-full py-4 flex  overflow-y-auto  items-center justify-center flex-wrap">
          {jobs.length}
          {/* map */}
          {Array.isArray(jobs) && jobs.length > 0 ? (
            jobs?.map((job) => {
              return <JobsCard job={job} key={job?._id} />;
            })
          ) : (
            <p>No jobs found</p>
          )}
          {/* map */}
        </div>
        <button onClick={() => setSize(size + 1)}>Click me</button>
      </div>
    </>
  );
}
