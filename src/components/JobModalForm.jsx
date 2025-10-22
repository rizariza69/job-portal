import { useState } from "react";
import { handleNumberInput, isValidNumber } from "../utils/formUtils";
export default function JobFormModal({ isOpen, onClose, onSave }) {
  if (!isOpen) return null;

  const [jobData, setJobData] = useState({
    name: "",
    type: "",
    description: "",
    candidateCount: "",
    minSalary: "",
    maxSalary: "",
  });

  const [error, setError] = useState("");
  const [profileConfig, setProfileConfig] = useState({
    full_name: "optional",
    photo_profile: "optional",
    gender: "optional",
    domicile: "optional",
    email: "optional",
    phone_number: "optional",
    linkedin_link: "optional",
    date_of_birth: "optional",
  });

  const handleSelect = (key, value) => {
    setProfileConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!jobData.name.trim()) return setError("Job name cannot be empty!");
    if (!jobData.type.trim()) return setError("Job type cannot be empty!");
    if (!jobData.description.trim())
      return setError("Job description cannot be empty!");
    if (!jobData.candidateCount.trim())
      return setError("Number of candidates cannot be empty!");
    if (!jobData.minSalary.trim() || !jobData.maxSalary.trim())
      return setError("Salary range cannot be empty!");

    if (!isValidNumber(jobData.candidateCount))
      return setError("Number of candidates must be a valid number!");
    if (!isValidNumber(jobData.minSalary) || !isValidNumber(jobData.maxSalary))
      return setError("Salary must be numeric values!");

    setError("");

    const existingJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    const newJob = {
      id: Date.now(),
      title: jobData.name,
      job_type: jobData.type,
      description: jobData.description,
      candidate_count: Number(jobData.candidateCount),
      salary: `Rp${Number(jobData.minSalary).toLocaleString(
        "id-ID"
      )} - Rp${Number(jobData.maxSalary).toLocaleString("id-ID")}`,
      config: profileConfig,
      status: "active",
      startDate: new Date().toLocaleDateString(),
    };

    localStorage.setItem("jobs", JSON.stringify([...existingJobs, newJob]));
    if (onSave) onSave(newJob);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
      <div className="bg-white w-[95%] md:w-[900px] rounded-lg shadow-xl overflow-auto max-h-[90vh] p-6">
        <div className="border-b border-gray-300 mb-4 -mx-6 px-6 pb-3 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Job Opening</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Ex. Front End Engineer"
              value={jobData.name}
              onChange={(e) => setJobData({ ...jobData, name: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Type<span className="text-red-500">*</span>
            </label>
            <select
              value={jobData.type}
              onChange={(e) => setJobData({ ...jobData, type: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="">Select job type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Description<span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              placeholder="Ex. Responsible for building user interfaces..."
              value={jobData.description}
              onChange={(e) =>
                setJobData({ ...jobData, description: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Candidates Needed<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Ex. 2"
              value={jobData.candidateCount}
              onChange={(e) =>
                handleNumberInput(e, (val) =>
                  setJobData({ ...jobData, candidateCount: val })
                )
              }
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Salary<span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Rp 7.000.000"
                value={jobData.minSalary}
                onChange={(e) =>
                  handleNumberInput(e, (val) =>
                    setJobData({ ...jobData, minSalary: val })
                  )
                }
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none"
              />
              <span className="text-gray-500">—</span>
              <input
                type="text"
                placeholder="Rp 8.000.000"
                value={jobData.maxSalary}
                onChange={(e) =>
                  handleNumberInput(e, (val) =>
                    setJobData({ ...jobData, maxSalary: val })
                  )
                }
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-6 border-t pt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Minimum Profile Information Required
            </h3>

            <div className="divide-y">
              {Object.keys(profileConfig).map((key) => (
                <div
                  key={key}
                  className="flex justify-between items-center py-3"
                >
                  <span className="capitalize text-gray-800">
                    {key.replace("_", " ")}
                  </span>

                  <div className="flex gap-2">
                    {["mandatory", "optional", "off"].map((type) => {
                      const active = profileConfig[key] === type;
                      const base =
                        "px-4 py-1.5 rounded-full border text-sm font-medium transition-all";
                      let color = "";

                      if (type === "mandatory") {
                        color = active
                          ? "bg-[#01959F] text-white border-[#01959F]"
                          : "border-[#01959F] text-[#01959F]/60 hover:text-[#01959F]";
                      } else if (type === "optional") {
                        color = active
                          ? "bg-[#FBC037] text-black border-[#FBC037]"
                          : "border-[#FBC037] text-[#FBC037]/60 hover:text-[#FBC037]";
                      } else {
                        color = active
                          ? "bg-gray-300 text-gray-800 border-gray-300"
                          : "border-gray-300 text-gray-400 hover:text-gray-600";
                      }

                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleSelect(key, type)}
                          className={`${base} ${color}`}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-300 mt-6 -mx-6 px-6 pt-4 flex justify-end gap-3">
            <button
              type="submit"
              className="bg-primary hover:bg-[#018088] text-white font-semibold px-5 py-2 rounded transition-all duration-200"
            >
              Publish Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
