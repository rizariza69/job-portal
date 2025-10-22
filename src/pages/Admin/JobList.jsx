import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import EmptyState from "../../../src/assets/empty-state.png";
import JobModalForm from "../../components/JobModalForm";
import { useNavigate } from "react-router-dom";
import Notification from "../../components/Notification";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    setJobs(savedJobs);
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleManageJob = (id) => {
    navigate(`/admin/manage/${id}`);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 border border-green-200";
      case "inactive":
        return "bg-red-100 text-red-600 border border-red-200";
      case "draft":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  };

  return (
    <>
      <div className="p-4 md:p-8 min-h-screen bg-gray-50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-stretch gap-6 mb-10  mx-auto">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search by job details"
              className="w-full border border-gray-300 rounded-lg py-3 pl-4 pr-10 focus:ring-2 focus:ring-amber-400 focus:outline-none bg-white shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute right-3 top-3.5" />
          </div>
          <div className="bg-[#111827] text-white rounded-xl p-5 w-full md:w-[22%] shadow-lg flex flex-col justify-between">
            <div>
              <p className="font-semibold text-sm mb-1">
                Recruit the best candidates
              </p>
              <p className="text-xs text-gray-300 mb-4 leading-snug">
                Create jobs, invite, and hire with ease
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-primary hover:bg-[#018088] text-white font-semibold px-4 py-2 rounded"
            >
              Create a new job
            </button>
          </div>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-16">
            <img
              src={EmptyState}
              alt="No job openings"
              className="w-60 md:w-72 mb-6"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              No job openings available
            </h2>
            <p className="text-gray-500 mb-6 text-sm md:text-base max-w-md">
              Create a job opening now and start the candidate process.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-secondary hover:bg-[#018088] text-black font-semibold px-4 py-2 rounded transition-all duration-200 shadow-sm"
            >
              Create a new job
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-5 mx-auto">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:w-[80%]"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusStyle(
                        job.status
                      )}`}
                    >
                      {job.status
                        ? job.status.charAt(0).toUpperCase() +
                          job.status.slice(1)
                        : "active"}
                    </span>
                    {job.startDate && (
                      <span className="text-xs text-gray-500 border border-gray-200 px-1 py-1 rounded-full">
                        started on {job.startDate}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {job.salary || "Rp0 - Rp0"}
                  </p>
                </div>
                <button
                  onClick={() => handleManageJob(job.id)}
                  className="bg-primary hover:bg-[#018088] text-white font-semibold px-4 py-2 rounded"
                >
                  Manage Job
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <JobModalForm
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={(newJob) => {
          setJobs((prev) => [...prev, newJob]);
          setShowModal(false);
          setNotification("Job vacancy successfully created");
        }}
      />
      {notification && (
        <Notification
          message={notification}
          position="bottom-left"
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
}
