import { Text } from "react-native";
import { View } from "react-native";
import { useCallback, useMemo, useRef, useState } from "react";
import { CustomBottomSheet } from "./BottomSheet";
import { SCREEN_HEIGHT } from "@gorhom/bottom-sheet";

export const BottomSheet = ({
  children,
  snapToIndex,
  setSnapToIndex,
  snaps,
  pushDownToClse = false
}) => {
  //   const [showBottomSheet, setShowBottomSheet] = useState(-1);
  const sheetRef = useRef(null);
  console.log(snaps);
  const snapPoints = useMemo(() => [...snaps], []);

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log(index);
    if (pushDownToClse) {
      if (index == 0) {
        // setSnapToIndex(-1);
        sheetRef.current?.close();
      }
    }
  }, []);

  return (
    <View style={{ height: SCREEN_HEIGHT, paddingTop: 50 }}>
      <View
        style={
          snapToIndex && {
            position: "absolute",
            top: 0,
            right: 0,
            width: "100%"
          }
        }>
        <CustomBottomSheet
          sheetRef={sheetRef}
          snapPoints={snapPoints}
          handleSheetChanges={handleSheetChanges}
          index={snapToIndex}>
          {children}
        </CustomBottomSheet>
      </View>
    </View>
  );
};
