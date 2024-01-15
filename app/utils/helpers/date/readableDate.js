/**
 * Formats a given date to a readable string in the "DD MMM YYYY" format.
 * @param {string | number | Date} date - The input date to be formatted.
 * @returns {string} - A formatted date string in the "DD MMM YYYY" format.
 */
export const ReadableDate = (date) => {
    const newDate = new Date(date);

    // Extract day, month, and year components
    const day = newDate.getUTCDate();
    const month = newDate.toLocaleString("default", { month: "short" });
    const year = newDate.getUTCFullYear();

    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
};
