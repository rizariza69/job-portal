import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDaysIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export default function DatePickerInput({
  value,
  onChange,
  error,
  label = "Date of birth",
  placeholder = "Select date of birth",
}) {
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div>
      <label className="text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>

      <div
        className={`relative flex items-center justify-between mt-1 border rounded-md px-3 py-2 bg-white ${
          error
            ? "border-red-500"
            : "border-gray-300 focus-within:border-[#01959F]"
        }`}
      >
        <div className="flex items-center w-full">
          <CalendarDaysIcon className="w-5 h-5 text-gray-400 mr-2" />

          <ReactDatePicker
            selected={value ? new Date(value) : null}
            onChange={(date) => onChange(date ? date.toISOString() : "")}
            dateFormat="dd MMMM yyyy"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            placeholderText={placeholder}
            className="w-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
            popperPlacement="bottom"
            calendarClassName="border border-gray-200 rounded-lg shadow-lg text-sm"
            dayClassName={() =>
              "text-gray-700 hover:bg-[#E6F7F8] hover:text-[#01959F] rounded-full"
            }
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className="flex items-center justify-between px-3 py-2 bg-white border-b text-sm">
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  className="text-gray-600 hover:text-[#01959F]"
                >
                  ‹
                </button>

                <div className="flex items-center gap-2">
                  <select
                    value={date.getFullYear()}
                    onChange={(e) => changeYear(Number(e.target.value))}
                    className="outline-none bg-transparent cursor-pointer"
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <select
                    value={date.getMonth()}
                    onChange={(e) => changeMonth(Number(e.target.value))}
                    className="outline-none bg-transparent cursor-pointer"
                  >
                    {months.map((m, i) => (
                      <option key={i} value={i}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  className="text-gray-600 hover:text-[#01959F]"
                >
                  ›
                </button>
              </div>
            )}
          />
        </div>
        <ChevronDownIcon className="w-5 h-5 text-gray-400 absolute right-3 pointer-events-none" />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
