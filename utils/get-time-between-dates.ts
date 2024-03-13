export const getTimeBetweenDates = (startDate: Date, endDate: Date) => {
  // Calculate the difference in milliseconds
  const diffMs = endDate.getTime() - startDate.getTime();

  // Convert milliseconds to minutes, hours, and days
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // Format the result
  let result = "";

  if (days > 0) {
    result += `${days}d `;
  }
  if (hours % 24 > 0) {
    result += `${hours % 24}h `;
  }
  if (minutes % 60 > 0) {
    result += `${minutes % 60}m`;
  }

  return result.trim();
};
