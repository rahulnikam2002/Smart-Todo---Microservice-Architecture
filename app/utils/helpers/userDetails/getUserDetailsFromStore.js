import { useContext } from "react";
import { AuthContext } from "../../../context/auth/auth.context";

export const getUserDetails = async () => {
    const { getUserDetailsWithToken } = useContext(AuthContext);
    const details = await getUserDetailsWithToken();
    if (!details) {
        // setUserDetails(null);
        logoutUser();
        return;
    }
    return details;
};
