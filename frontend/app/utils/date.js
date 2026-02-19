export default function formatDate(isoString) {
  const dateObj = new Date(isoString);

  // Method 1: Using toLocaleString() for a locale-specific format
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC", // Ensures it stays in UTC, omit for local time
    hour12: false,
  };
  const formattedDate = dateObj.toLocaleString("en-GB", options);
  // Output: "Sunday, 1 February 2026, 18:45:32" (Example format)

  // Method 2: Manual construction for exact format: "Day, Date Month Year Time"
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = days[dateObj.getUTCDay()];
  const day = dateObj.getUTCDate();
  const month = months[dateObj.getUTCMonth()];
  const year = dateObj.getUTCFullYear();
  const time = dateObj.toUTCString().split(" ")[4]; // HH:mm:ss

  const customFormat = `${dayOfWeek}, ${day} ${month} ${year} ${time}`;
  return customFormat;
}
