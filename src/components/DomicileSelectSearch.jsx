import React from "react";
import Select from "react-select";

const DomicileSelectSearch = ({ value, onChange, error }) => {
  const domiciles = [
    "Kota Jakarta Barat - DKI Jakarta",
    "Kota Surabaya - Jawa Timur",
    "Kota Bandung - Jawa Barat",
    "Kota Yogyakarta - DI Yogyakarta",
    "Kota Medan - Sumatera Utara",
    "Kota Denpasar - Bali",
    "Kota Makassar - Sulawesi Selatan",
    "Kota Balikpapan - Kalimantan Timur",
    "Kota Palembang - Sumatera Selatan",
    "Kota Bogor - Jawa Barat",
  ];

  const options = domiciles.map((d) => ({ value: d, label: d }));

  return (
    <div>
      <label className="text-sm font-medium text-gray-700">
        Domicile<span className="text-red-500">*</span>
      </label>

      <Select
        value={value ? { value, label: value } : null}
        onChange={(selected) => onChange(selected ? selected.value : "")}
        options={options}
        placeholder="Choose your domicile"
        isSearchable
        className="mt-1 text-sm"
        classNames={{
          control: (state) =>
            `border rounded-md ${
              error
                ? "border-red-500"
                : state.isFocused
                ? "border-[#01959F] shadow-sm"
                : "border-gray-300"
            }`,
        }}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        menuPortalTarget={document.body}
        components={{
          IndicatorSeparator: () => null,
        }}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default DomicileSelectSearch;
