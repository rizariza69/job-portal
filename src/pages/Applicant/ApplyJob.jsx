import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowUpTrayIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";
import WebcamGestureCapture from "../../components/WebcamGestureCapture";
import Dummy from "../../assets/Avatar.png";
import DatePickerInput from "../../components/DatePickerInput";
import DomicileSelectSearch from "../../components/DomicileSelectSearch";
import PhoneNumberInput from "../../components/PhoneNumberInput";

export default function ApplyJob() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    photo: null,
    fullName: "",
    dob: "",
    gender: "",
    domicile: "",
    phone: "",
    email: "",
    linkedin: "",
  });
  const [errors, setErrors] = useState({});
  const [validLinkedIn, setValidLinkedIn] = useState(false);
  const [countryCode, setCountryCode] = useState("+62");
  const [job, setJob] = useState([]);
  const [showCamera, setShowCamera] = useState(false);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    const foundJob = storedJobs.find((j) => Number(j.id) === Number(id));
    if (foundJob) setJob(foundJob);
  }, [id]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });

    if (field === "linkedin") {
      const regex = /^https?:\/\/(www\.)?[a-z0-9-]+(\.[a-z]+)+(\/.*)?$/;
      setValidLinkedIn(regex.test(value));
    }
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      if (!form[key]) newErrors[key] = "This field is required";
    });
    if (form.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email))
      newErrors.email = "Invalid email format";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const storedJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    const updatedJobs = storedJobs.map((j) => {
      if (j.id === Number(id)) {
        const applicants = j.applicants || [];
        const newApplicant = {
          ...form,
          phone: `${countryCode.trim()}${form.phone.replace(/\s+/g, "")}`,
          appliedAt: new Date().toISOString(),
        };
        return { ...j, applicants: [...applicants, newApplicant] };
      }
      return j;
    });

    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    navigate("/apply-success");
  };

  if (!job)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Job not found
      </div>
    );

  return (
    <div className="min-h-screen bg-white flex justify-center py-10">
      <form
        onSubmit={handleSubmit}
        className="w-[700px] space-y-5 border p-8 rounded-lg shadow-sm"
      >
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 text-black font-bold hover:text-[#01959F] border border-[#E0E0E0]  px-1 py-1 rounded-md"
            >
              <ArrowLeftIcon className="w-4 h-4" />
            </button>

            <h2 className="text-xl font-semibold text-gray-800">
              Apply {job.title} at {job.company || "Rakamin"}
            </h2>
          </div>

          <p className="text-xs text-gray-500">
            ℹ️ This field required to fill
          </p>
        </div>
        <>
          <div>
            <p className="text-xs text-gray-500 mb-2 text-red-500 font-bold">
              <span className="text-red-500">*</span> Required
            </p>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Photo Profile
            </p>
            {photo ? (
              <img
                src={photo}
                alt="profile"
                className="w-[128px] h-[128px] rounded-lg object-cover"
              />
            ) : (
              <img
                src={Dummy}
                alt="profile"
                className="w-[128px] h-[128px] rounded-lg object-cover"
              />
            )}
            <button
              type="button"
              onClick={() => setShowCamera(true)}
              className="flex items-center mt-2 px-3 py-1.5 text-[14px] font-semibold border rounded-md"
            >
              <ArrowUpTrayIcon className="w-[12px] h-[12px] mr-1" /> Take a
              Picture
            </button>
          </div>
          {showCamera && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-xl w-full relative">
                <button
                  onClick={() => setShowCamera(false)}
                  className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  Raise Your Hand to Capture
                </h2>
                <p className="text-sm text-gray-600 mb-3">
                  We’ll take the photo once your hand pose is detected.
                </p>

                <WebcamGestureCapture
                  onCapture={(data) => {
                    setPhoto(data);
                    setForm({ ...form, photo: data });
                    setShowCamera(false);
                  }}
                  onClose={() => setShowCamera(false)}
                />
              </div>
            </div>
          )}
        </>
        <div>
          <label className="text-sm font-medium text-gray-700">
            Full name<span className="text-red-500">*</span>
          </label>
          <input
            value={form.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="Enter your full name"
            className={`w-full mt-1 p-2 border rounded-md focus:outline-none ${
              errors.fullName
                ? "border-red-500"
                : "focus:border-[#01959F] border-gray-300"
            }`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>
        <DatePickerInput
          value={form.dob}
          onChange={(value) => handleChange("dob", value)}
          error={errors.dob}
        />
        <div>
          <label className="text-sm font-medium text-gray-700">
            Pronoun (gender)<span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4 mt-2">
            {["She/her (Female)", "He/him (Male)"].map((g) => (
              <label key={g} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={form.gender === g}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className="accent-[#01959F]"
                />
                <span className="text-sm">{g}</span>
              </label>
            ))}
          </div>
          {errors.gender && (
            <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
          )}
        </div>
        <DomicileSelectSearch
          value={form.domicile}
          onChange={(val) => handleChange("domicile", val)}
          error={errors.domicile}
        />

        <PhoneNumberInput
          value={form.phone}
          onChange={(val) => setForm({ ...form, phone: val })}
          error={errors.phone}
        />
        <div>
          <label className="text-sm font-medium text-gray-700">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Enter email address"
            className={`w-full mt-1 p-2 border rounded-md focus:outline-none ${
              errors.email
                ? "border-red-500"
                : "focus:border-[#01959F] border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">
            Link LinkedIn<span className="text-red-500">*</span>
          </label>
          <input
            value={form.linkedin}
            onChange={(e) => handleChange("linkedin", e.target.value)}
            placeholder="https://www.linkedin.com/in/username"
            className={`w-full mt-1 p-2 border rounded-md focus:outline-none ${
              errors.linkedin
                ? "border-red-500"
                : "focus:border-[#01959F] border-gray-300"
            }`}
          />
          {validLinkedIn && (
            <div className="flex items-center text-[#01959F] text-xs mt-1">
              <CheckCircleIcon className="w-4 h-4 mr-1" /> URL address found
            </div>
          )}
          {errors.linkedin && (
            <p className="text-red-500 text-xs mt-1">{errors.linkedin}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-[#01959F] hover:bg-[#018088] text-white font-semibold py-2 rounded-md transition-all"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
