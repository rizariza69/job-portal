import { useEffect, useState } from "react";
import { MapPinIcon, BanknotesIcon } from "@heroicons/react/24/outline";
import EmptyState from "../../assets/empty-state.png";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    setJobs(storedJobs);
    if (storedJobs.length > 0) setSelectedJob(storedJobs[0]);
  }, []);

  const handleSelectJob = (job) => {
    setSelectedJob(job);
  };

  const handleApply = (id) => {
    navigate(`/apply/${id}`);
  };

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50 text-center px-4">
        <img
          src={EmptyState}
          alt="No job openings"
          className="w-60 md:w-72 mb-6"
        />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          No job openings available
        </h2>
        <p className="text-gray-500 text-sm md:text-base max-w-md mb-6">
          Please wait until the company posts a new job opportunity.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row bg-white h-screen px-32 gap-6 py-6">
      <div className="w-full md:w-[40%] overflow-y-auto">
        <div className="flex flex-col gap-4">
          {jobs.map((job) => {
            const isActive = selectedJob?.id === job.id;
            return (
              <div
                key={job.id}
                onClick={() => handleSelectJob(job)}
                className={`w-full h-[140px] cursor-pointer rounded-xl border p-4 flex flex-col justify-between transition-all duration-200 ${
                  isActive
                    ? "border-[#01959F] bg-[#F7FEFF] shadow-sm"
                    : "border-gray-200 bg-white hover:shadow-sm"
                }`}
              >
                <div className="flex items-start gap-3">
                  <img
                    src={job.logo || Logo}
                    alt={job.title}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div>
                    <h2 className="text-[16px] font-semibold text-gray-900 leading-snug">
                      {job.title}
                    </h2>
                    <p className="text-[14px] text-[#404040] mt-1">Rakamin</p>
                  </div>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-[#616161] text-[12px] leading-5">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    Jakarta Selatan
                  </div>
                  <div className="flex items-center text-[#616161] text-[12px] leading-5">
                    <BanknotesIcon className="w-4 h-4 mr-1" />
                    {job.salary || "Rp7.000.000 - Rp8.000.000"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-1 bg-white border rounded-xl shadow-sm overflow-y-auto p-6">
        {selectedJob ? (
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-4">
                <img
                  src={selectedJob.logo || Logo}
                  alt={selectedJob.title}
                  className="w-12 h-12 rounded-md object-cover"
                />

                <div>
                  <div className="mb-2">
                    <span className="inline-block bg-[#01959F] text-white text-xs font-semibold px-3 py-1 rounded">
                      {selectedJob.job_type || "Full-time"}
                    </span>
                  </div>
                  <h2 className="text-[18px] font-bold text-[#404040] leading-[28px]">
                    {selectedJob.title}
                  </h2>
                  <p className="text-[14px] text-[#757575] leading-[24px] mt-1">
                    Rakamin
                  </p>
                </div>
              </div>
              <button
                className="bg-[#FBC037] text-black font-semibold text-sm rounded-md"
                style={{ width: "71px", height: "32px" }}
                onClick={() => handleApply(selectedJob.id)}
              >
                Apply
              </button>
            </div>
            <hr className="border-gray-200 my-4 w-[95%]" />
            <div
              className="text-gray-700 leading-relaxed whitespace-pre-line"
              style={{
                lineHeight: "1.75rem",
                whiteSpace: "pre-line",
                wordWrap: "break-word",
              }}
            >
              {selectedJob.description.split("\n").map((line, index) => (
                <div key={index} className="mb-1">
                  {line.trim() || "\u00A0"}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a job to see details
          </div>
        )}
      </div>
    </div>
  );
}
