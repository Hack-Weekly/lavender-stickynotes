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