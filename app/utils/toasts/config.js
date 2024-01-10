// App.jsx
import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
  SuccessToast
} from "react-native-toast-message";
import { fonts } from "../constants/fonts/fonts";
import { Colors } from "../constants/colors/colors";

/*
  1. Create the config
*/
export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <SuccessToast
      {...props}
      // style={{ borderLeftColor: Colors.green.bsae }}
      text1Style={{
        fontFamily: fonts.Montserrat[600]
      }}
      text2Style={{
        fontFamily: fonts.Montserrat[400]
      }}
    />
  ),

  info: (props) => (
    <InfoToast
      {...props}
      text1Style={{
        fontFamily: fonts.Montserrat[600]
      }}
      text2Style={{
        fontFamily: fonts.Montserrat[400]
      }}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontFamily: fonts.Montserrat[600]
      }}
      text2Style={{
        fontFamily: fonts.Montserrat[400]
      }}
    />
  )
};
