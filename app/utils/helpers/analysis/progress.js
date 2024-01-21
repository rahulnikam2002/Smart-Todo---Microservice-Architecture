import axios from "axios";
import { todoServiceHost } from "../../constants/ip";
import { tokens } from "../../constants/constant";

export const getTodaysProgress = async (smartToken, userEmail, date) => {
    try {
        const serverResponse = await axios.get(`${todoServiceHost}/api/analysis/todo/date?date=${date}`, {
            headers: {
                Authorization: tokens.authToken,
                "smart-auth-token": smartToken,
                "user-auth-email": userEmail
            }
        });
        return serverResponse.data;
    } catch (error) {
        return false;
    }
};
