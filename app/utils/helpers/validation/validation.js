export const validationByRegex = (text, regexPattern) => {
    const regex = new RegExp(regexPattern);
    return regex.test(text);
};

export const usernamevalidation = (userName) => {
    if (userName && userName.length > 2) return true;
    return false;
};

export const phoneNumberValidation = (phoneNumber) => {
    if (phoneNumber && phoneNumber.toString().length >= 10 && phoneNumber.toString().length <= 12) return true;
    return false;
};

export const createNewSingleTaskValidation = (taskName, endDate, todoCategories, todoDescription) => {
    console.log({
        taskName,
        endDate,
        todoCategories,
        todoDescription
    });
    if (!taskName || taskName.trim() === "") {
        return false;
    }
    console.log("pass 1");
    if (!endDate && (typeof endDate !== "object" || typeof endDate !== "string")) {
        return false;
    }
    console.log("pass 2");
    if (todoCategories && typeof todoCategories !== "string") {
        return false;
    }
    console.log("pass 3");
    if (todoDescription && typeof todoDescription !== "string") {
        return false;
    }
    console.log("pass 4");
    return true;
};
