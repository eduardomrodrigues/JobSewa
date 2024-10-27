import NavBar from "@/components/NavBar";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setJobData } from "@/Utils/JobSlice";
import JobsCard from "@/components/JobsCard";
import { get_job } from "@/Services/job";
import useSWR from "swr";
import { toast } from "react-toastify";

export default function DisplayJobs() {
  const dispatch = useDispatch();
  const JobData = useSelector((state) => state?.Job?.JobData);
  const [pageIndex, setPageIndex] = useState(0);

  const { data, error, isLoading } = useSWR(
    `/getAllJobs?pageIndex=${pageIndex}`,
    () => get_job(pageIndex)
  );

  useEffect(() => {
    if (data) {
      console.log(JobData.push());
      dispatch(setJobData(data.data));
    }
  }, [data, dispatch, pageIndex]);

  if (error) toast.error(error);

  return (
    <>
      <NavBar />
      <div className="w-full  py-20 flex items-center md:px-8 px-2  justify-center flex-col">
        <h1 className="px-4 mx-2 py-2 mt-8 mb-4 leading-relaxed uppercase tracking-wider border-b-2 border-b-indigo-600 text-3xl font-semibold">
          Available Jobs
        </h1>
        <div className="w-full h-full py-4 flex  overflow-y-auto  items-center justify-center flex-wrap">
          {/* map */}
          {Array.isArray(JobData) && JobData.length > 0 ? (
            JobData?.map((job) => {
              return <JobsCard job={job} key={job?._id} />;
            })
          ) : (
            <p>No jobs found</p>
          )}
          {/* map */}
        </div>
        <button onClick={() => setPageIndex(pageIndex + 1)}>Click me</button>
      </div>
    </>
  );
}
