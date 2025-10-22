import { useState, useEffect, useRef } from "react";

export default function PhoneNumberInput({
  value,
  onChange,
  error,
  label = "Phone number",
}) {
  const countries = [
    { name: "Indonesia", code: "+62", flag: "https://flagcdn.com/w20/id.png" },
    { name: "Singapore", code: "+65", flag: "https://flagcdn.com/w20/sg.png" },
    { name: "Malaysia", code: "+60", flag: "https://flagcdn.com/w20/my.png" },
    { name: "Thailand", code: "+66", flag: "https://flagcdn.com/w20/th.png" },
    { name: "Vietnam", code: "+84", flag: "https://flagcdn.com/w20/vn.png" },
    { name: "Japan", code: "+81", flag: "https://flagcdn.com/w20/jp.png" },
    {
      name: "Philippines",
      code: "+63",
      flag: "https://flagcdn.com/w20/ph.png",
    },
    { name: "India", code: "+91", flag: "https://flagcdn.com/w20/in.png" },
    { name: "China", code: "+86", flag: "https://flagcdn.com/w20/cn.png" },
  ];

  const [showList, setShowList] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const dropdownRef = useRef(null);

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.startsWith("0")) return;
    onChange(val);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          <span className="text-red-500">*</span>
        </label>
      )}

      <div
        className={`flex items-center gap-2 mt-1 border rounded-md bg-white px-2 py-2 transition-colors ${
          error
            ? "border-red-500"
            : "border-gray-300 focus-within:border-[#01959F]"
        }`}
      >
        <button
          type="button"
          onClick={() => setShowList(!showList)}
          className="flex items-center px-1 border-r focus:outline-none"
        >
          <img
            src={selectedCountry.flag}
            alt={selectedCountry.name}
            className="w-5 h-4 rounded-full"
          />
          <svg
            className={`w-4 h-4 ml-1 text-gray-500 transition-transform ${
              showList ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <span className="text-sm text-gray-700">{selectedCountry.code}</span>
        <input
          value={value}
          onChange={handlePhoneChange}
          placeholder="81XXXXXXXXX"
          className="flex-1 border-none focus:outline-none text-sm text-gray-700 placeholder-gray-400"
        />
      </div>

      {showList && (
        <div className="absolute z-50 w-72 bg-white border border-gray-200 rounded-md mt-2 shadow-lg">
          <div className="p-2 border-b">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country"
              className="w-full px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:border-[#01959F]"
            />
          </div>

          <div className="max-h-56 overflow-y-auto text-sm">
            {filteredCountries.map((country) => (
              <div
                key={country.name}
                onClick={() => {
                  setSelectedCountry(country);
                  setShowList(false);
                }}
                className={`flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[#E6F7F8] ${
                  country.name === selectedCountry.name ? "bg-[#E6F7F8]" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={country.flag}
                    alt={country.name}
                    className="w-5 h-4 rounded-full"
                  />
                  <span>{country.name}</span>
                </div>
                <span className="text-gray-500">{country.code}</span>
              </div>
            ))}
            {filteredCountries.length === 0 && (
              <p className="text-gray-400 text-center py-2">No results found</p>
            )}
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
