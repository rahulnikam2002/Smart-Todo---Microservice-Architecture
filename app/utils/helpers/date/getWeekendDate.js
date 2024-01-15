import { formatTime } from "./formatTime";

export const getWeekEndDate = () => {
    let today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the beginning of the day
    let currentDay = today.getDay();
    let daysUntilSunday = 7 - currentDay;

    let comingSunday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysUntilSunday);

    comingSunday.setHours(23, 59, 59, 999); // Set time to the end of the day
    const formattedTime = formatTime(comingSunday);
    return formattedTime;
};
