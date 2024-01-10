import Toast from "react-native-toast-message";

export const successToast = (heading, subHeading ) =>
  Toast.show({
    type: "success",
    text1: heading,
    text2: subHeading
  });

export const infoToast = (heading, subHeading ) => {
  Toast.show({
    type: "info",
    text1: heading,
    text2: subHeading,
    position: "top"
  });
};

export const errorToast = ( heading, subHeading ) =>
  Toast.show({
    type: "error",
    text1: heading,
    text2: subHeading
  });
