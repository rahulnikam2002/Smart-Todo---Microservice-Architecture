import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { ScrollView } from "react-native";

const height = Dimensions.get("screen").height;

export const CustomBottomSheet = ({
  sheetRef,
  snapPoints,
  index,
  handleSheetChanges,
  children
}) => {
  // renders
  return (
    <View style={styles.container}>
      {index >= 1 && (
        <View
          style={{
            height: height,
            backgroundColor: "#00000010",
            position: "absolute",
            top: 0,
            right: 0,
            width: "100%"
          }}>
          <BottomSheet
            ref={sheetRef}
            index={index}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}>
            <View style={styles.contentContainer}>{children}</View>
          </BottomSheet>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%"
  },
  contentContainer: {
    // padding: 20
  }
});
