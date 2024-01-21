/**
 * Formats a list of todos into expired and pending tasks based on their expiration date.
 * @param {Array} searchResults - The array of todo objects to be formatted.
 * @returns {Object} An object containing two arrays: expiredTasks and pendingTodos.
 * ```javascript
 * const formattedResults = formatTodos(allTodos)
 * ```
 */

exports.formartTodos = (searchResults) => {
    // Get the current date and time
    const todaysDate = new Date();
    todaysDate.setHours(23, 59, 59, 999);
    // Arrays to store past and future todos
    const pastTodos = [];
    const futureTodos = [];
    const completedTodos = [];

    for (let i = 0; i < searchResults.length; i++) {
        let currentTaskDate = new Date(searchResults[i].expireAt);
        // currentTaskDate.setHours(0, 0, 0, 0);

        console.log({ name: searchResults[i].todoTitle, currentTaskDate, todaysDate });

        if (searchResults[i].done) {
            console.log(true);
            completedTodos.push(searchResults[i]);
        } else if (currentTaskDate < todaysDate && !searchResults[i].done) {
            pastTodos.push(searchResults[i]);
        } else if (currentTaskDate >= todaysDate && !searchResults[i].done) {
            futureTodos.push(searchResults[i]);
        }
    }

    return {
        expiredTasks: pastTodos,
        pendingTodos: futureTodos,
        completedTodos
    };
};
