import axios from "axios";
import { todoServiceHost } from "../../constants/ip";
import { tokens } from "../../constants/constant";

export const getRecentTodos = async (number, smartUserToken, userEmail) => {
    try {
        const data = await axios.get(`${todoServiceHost}/api/todo/todos/count?count=${number}`, {
            headers: {
                Authorization: tokens.authToken,
                "smart-auth-token": smartUserToken,
                "user-auth-email": userEmail
            }
        });
        return data.data;
    } catch (error) {
        return null;
    }
};
