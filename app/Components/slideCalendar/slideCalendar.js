import { SafeAreaView, View } from "react-native";
import { MediumText, SmallHeadingText } from "../Text/Headings/Headings";
import { eachWeekOfInterval, addDays, subDays, eachDayOfInterval, format } from "date-fns";
import PagerView from "react-native-pager-view";
import { CustomSafeAreaView } from "../SafeAreaView/SafeAreaView";

export const SlideCalendar = () => {
    const dates = eachWeekOfInterval(
        {
            start: subDays(new Date(), 14),
            end: addDays(new Date(), 14)
        },
        {
            weekStartsOn: 1
        }
    ).reduce((acc, cur) => {
        const allDays = eachDayOfInterval({
            start: cur,
            end: addDays(cur, 6)
        });

        acc.push(allDays);
        return acc;
    }, []);

    return (
        <SafeAreaView style={{ height: "100%" }}>
            <PagerView
                // initialPage={0}
                style={{ height: "20%", width: "100%" }}>
                {dates.map((weeks, i) => (
                    <View key={String(i)}>
                        <View style={{ flexDirection: "row", width: "100%" }}>
                            {weeks.map((day) => {
                                const txt = format(new Date(day), "EEE");
                                return (
                                    <View>
                                        <MediumText>{txt}</MediumText>
                                        <SmallHeadingText>{day.getDate()}</SmallHeadingText>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                ))}
            </PagerView>
        </SafeAreaView>
    );
};
