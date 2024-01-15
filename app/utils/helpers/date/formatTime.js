/**
 * Formats a given date by setting hours, minutes, seconds, and milliseconds to the maximum values (end of the day).
 * @param {string | number | Date} date - The input date to be formatted.
 * @returns {Date} - A new Date object representing the input date with time set to the end of the day.
 */

export const formatTime = (date) => {
    // Create a new Date object from the input date
    const originalDate = new Date(date);

    // Set hours, minutes, seconds, and milliseconds to the maximum values (end of the day)
    originalDate.setUTCHours(23, 59, 59, 999);
    return originalDate;
};
