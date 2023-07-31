// Function to calculate the difference in days between a given timestamp and the current date
export function getDaysDifferenceFromToday(timestamp) {
  const currentDate = new Date();

  // Parse the timestamp into a Unix timestamp (milliseconds since Jan 1, 1970)
  const givenUnixTimestamp = Date.parse(timestamp);

  // Calculate the time difference in milliseconds
  const timeDifference = currentDate - givenUnixTimestamp;

  // Convert milliseconds to days
  const days = Math.round(timeDifference / (1000 * 60 * 60 * 24));

  return days;
}

export function formatDate(inputDate) {
  const date = new Date(inputDate);
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  const formattedDate = `${day} ${month} ${hours % 12}:${minutes
    .toString()
    .padStart(2, "0")} ${ampm}`;

  return formattedDate;
}
