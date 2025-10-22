export const handleNumberInput = (e, setValue) => {
  const value = e.target.value.replace(/\D/g, "");
  setValue(value);
};
export const isValidNumber = (value) => {
  const regex = /^[0-9]+$/;
  return regex.test(value);
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const formatRupiah = (value) => {
  if (!value) return "";
  const numberString = value.toString().replace(/\D/g, "");
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(numberString);
  return formatted.replace("Rp", "Rp ");
};

export const parseRupiah = (value) => {
  if (!value) return "";
  return value.replace(/[^\d]/g, "");
};
