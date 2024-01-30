import { StyleSheet, View } from "react-native";
import { MediumText } from "../../../Components/Text/Headings/Headings";
import { Colors } from "../../../utils/constants/colors/colors";
import { fonts } from "../../../utils/constants/fonts/fonts";
import { Input } from "../../../Components/Input/Input";
import { MotiView } from "moti";
import { useCallback, useContext, useState } from "react";
import { SearchTodoContainer } from "../../../Components/Search/TodoContainer/TodoContainer";
import { infoToast } from "../../../utils/toasts/toasts";
import axios from "axios";
import { todoServiceHost } from "../../../utils/constants/ip";
import { tokens } from "../../../utils/constants/constant";
import { AuthContext } from "../../../context/auth/auth.context";
import { SearchTodoContainerSkeleton } from "../../../Components/Skeleton/SingleSearchTodoContainer";
import { FlashList } from "@shopify/flash-list";

export const SearchScreen = () => {
    const { getUserDetailsWithToken, logoutUser } = useContext(AuthContext);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const getUserDetails = async () => {
        const details = await getUserDetailsWithToken();
        if (!details) {
            logoutUser();
            return;
        }
        return details;
    };

    const search = useCallback(async (term) => {
        try {
            if (term.length >= 1) {
                setLoading(true);
                const { result: SmartUserToken, userEmail } = await getUserDetails();
                const results = await axios.get(`${todoServiceHost}/api/search?term=${term}`, {
                    headers: {
                        Authorization: tokens.authToken,
                        "smart-auth-token": SmartUserToken,
                        "user-auth-email": userEmail
                    }
                });
                setSearchResults(results.data.pendingTodos);
                setLoading(false);
                return;
            }
            setSearchResults([]);
            setLoading(false);
        } catch (error) {
            infoToast("Something went wrong!", "You may still work on, our team is working on the issue");
        }
    }, []);

    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    // Create a debounced version of the search function
    const debouncedSearch = debounce(search, 500);

    const handleSearchTextChange = (term) => {
        // Call the debounced function with the term parameter
        setLoading(true);
        debouncedSearch(term);
    };

    return (
        <View style={styles.container}>
            <MotiView style={styles.searchBarContainer}>
                <Input
                    onSubmit={() => {}}
                    focus={true}
                    onChange={(e) => handleSearchTextChange(e)}
                    sx={{
                        fontFamily: fonts.Montserrat[500],
                        borderRadius: 5,
                        backgroundColor: Colors.bgGrey,
                        height: 55
                    }}
                    placeholder={"Search pending tasks..."}
                />
            </MotiView>

            {searchResults.length !== 0 && (
                <MotiView style={styles.searchTodoContainer}>
                    {!loading ? (
                        <FlashList
                            data={searchResults}
                            renderItem={({ item, index }) => (
                                <SearchTodoContainer
                                    title={item.todoTitle}
                                    todoId={item.id}
                                />
                            )}
                            estimatedItemSize={150}
                        />
                    ) : (
                        <View>
                            <SearchTodoContainerSkeleton />
                            <SearchTodoContainerSkeleton />
                            <SearchTodoContainerSkeleton />
                            <SearchTodoContainerSkeleton />
                            <SearchTodoContainerSkeleton />
                            <SearchTodoContainerSkeleton />
                        </View>
                    )}
                </MotiView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        height: "100%"
    },
    searchBarContainer: {
        marginHorizontal: 15,
        marginVertical: 0
    },
    searchTodoContainer: {
        marginHorizontal: 15,
        marginTop: 15,
        marginBottom: 10,
        height: "100%"
    },
    emptyTodos: {
        backgroundColor: Colors.bgGrey,
        padding: 15,
        borderRadius: 5
    }
});
