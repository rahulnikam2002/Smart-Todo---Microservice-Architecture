import { getWeekEndDate } from "./getWeekendDate";

/**
 * Formats a given date to a readable string in the "DD MMM YYYY" format.
 * @param {string | number | Date} date - The input date to be formatted.
 * @returns {string} - A formatted string which can be "today", "tomorrwo", "thisweekend" or "calendar" .
 */
export const getEndingTaskDate = (date) => {
    const newDate = new Date(date);
    if (isToday(newDate)) {
        return "today";
    } else if (isTomorrow(newDate)) {
        return "tomorrow";
    } else if (isThisWeekend(newDate)) {
        return "thisweekend";
    } else {
        return "calendar";
    }
};

/**
 * Checks if the given date is today.
 * @param {Date|string} date - The date to be checked.
 * @returns {boolean} Returns true if the date is today, otherwise false.
 */
const isToday = (date) => {
    // Get the ISO string representation of the provided date and today's date
    const existingDate = new Date(date).toISOString().split("T")[0];
    const todaysDate = new Date().toISOString().split("T")[0];

    // Compare the two dates and return the result
    if (todaysDate === existingDate) {
        return true;
    }
    return false;
};

/**
 * Checks if the given date is tomorrow.
 * @param {Date|string} date - The date to be checked.
 * @returns {boolean} Returns true if the date is tomorrow, otherwise false.
 */
const isTomorrow = (date) => {
    // Get the ISO string representation of the provided date and tomorrow's date
    const existingDate = new Date(date).toISOString().split("T")[0];
    let tomorrowsDate = new Date();
    tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);
    const finalTomorrowsDate = new Date(tomorrowsDate).toISOString().split("T")[0];

    // Compare the two dates and return the result
    if (existingDate === finalTomorrowsDate) return true;
    return false;
};

/**
 * Checks if the given date is during the current weekend.
 * @param {Date|string} date - The date to be checked.
 * @returns {boolean} Returns true if the date is during the weekend, otherwise false.
 */
const isThisWeekend = (date) => {
    // Get the ISO string representation of the provided date and the end date of the current weekend
    const existingDate = new Date(date).toISOString().split("T")[0];
    const thisWeekEndDate = getWeekEndDate().toISOString().split("T")[0];

    // Compare the two dates and return the result
    if (existingDate === thisWeekEndDate) return true;
    return false;
};
