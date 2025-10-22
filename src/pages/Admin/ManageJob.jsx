import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import EmptyState2 from "../../assets/empty-state2.png";

export default function CandidateList() {
  const { id } = useParams();
  const [job, setJob] = useState([]);
  const [selected, setSelected] = useState([]);
  const headerCheckboxRef = useRef(null);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    const foundJob = storedJobs.find((j) => Number(j.id) === Number(id));

    if (foundJob) {
      const normalizedApplicants = (foundJob.applicants || []).map((val) => {
        let cleanPhone = val.phone?.trim();

        if (cleanPhone?.startsWith("+")) {
          cleanPhone = "0" + cleanPhone.slice(3);
        }
        return {
          ...val,
          phone: cleanPhone.trim(),
        };
      });

      setJob({ ...foundJob, applicants: normalizedApplicants });
      setSelected([]);
    }
  }, [id]);

  const applicants = job?.applicants || [];

  useEffect(() => {
    if (!headerCheckboxRef.current) return;
    const total = applicants.length;
    const checkedCount = selected.length;

    if (checkedCount === 0) {
      headerCheckboxRef.current.checked = false;
      headerCheckboxRef.current.indeterminate = false;
    } else if (checkedCount === total) {
      headerCheckboxRef.current.checked = true;
      headerCheckboxRef.current.indeterminate = false;
    } else {
      headerCheckboxRef.current.checked = false;
      headerCheckboxRef.current.indeterminate = true;
    }
  }, [selected, applicants]);

  const toggleSelectAll = () => {
    if (selected.length === applicants.length) {
      setSelected([]);
    } else {
      setSelected(applicants.map((_, index) => index));
    }
  };

  const toggleSelect = (index) => {
    setSelected((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index]
    );
  };

  if (!applicants.length) {
    return (
      <div className="p-6 bg-white">
        <h2 className="font-semibold mb-3 text-sm">{job?.title}</h2>
        <div className="border rounded-lg w-full h-[calc(100vh-150px)] flex flex-col items-center justify-center bg-white">
          <img src={EmptyState2} alt="No candidates" className="w-52 mb-5" />
          <p className="font-bold text-gray-700 text-[16px]">
            No candidates found
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Share your job vacancies so that more candidates will apply.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white">
      <h2 className="font-semibold mb-3 text-sm">{job?.title}</h2>
      <div className="border rounded-lg w-full h-[calc(100vh-150px)] flex flex-col bg-white">
        <div className="border rounded-lg overflow-hidden w-full bg-white p-5 ">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left border border-gray-300">
                  <input
                    ref={headerCheckboxRef}
                    type="checkbox"
                    onChange={toggleSelectAll}
                    className="cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3 text-left border border-gray-300">
                  NAMA LENGKAP
                </th>
                <th className="px-4 py-3 text-left border border-gray-300">
                  EMAIL ADDRESS
                </th>
                <th className="px-4 py-3 text-left border border-gray-300">
                  PHONE NUMBERS
                </th>
                <th className="px-4 py-3 text-left border border-gray-300">
                  DATE OF BIRTH
                </th>
                <th className="px-4 py-3 text-left border border-gray-300">
                  DOMICILE
                </th>
                <th className="px-4 py-3 text-left border border-gray-300">
                  GENDER
                </th>
                <th className="px-4 py-3 text-left border border-gray-300">
                  LINK LINKEDIN
                </th>
              </tr>
            </thead>
            <tbody>
              {applicants?.map((value, index) => {
                return (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-colors border border-gray-300"
                  >
                    <td className="px-4 py-3 border border-gray-300">
                      <input
                        type="checkbox"
                        checked={selected.includes(index)}
                        onChange={() => toggleSelect(index)}
                        className="cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3 border border-gray-300 max-w-[150px] truncate">
                      {value.fullName || "-"}
                    </td>
                    <td className="px-4 py-3 border border-gray-300 max-w-[150px] truncate">
                      {value.email || "-"}
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      {value.phone || "-"}
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      {new Date(value.dob).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }) || "-"}
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      {value.domicile || "-"}
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      {value.gender === "She/her (Female)"
                        ? "Female"
                        : value.gender === "He/him (Male)"
                        ? "Male"
                        : value.gender}
                    </td>
                    <td className="px-4 py-3 border border-gray-300 max-w-[150px] truncate">
                      <a
                        href={value.linkedin}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {value.linkedin}
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
