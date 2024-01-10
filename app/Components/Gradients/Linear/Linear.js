import { LinearGradient } from "expo-linear-gradient";

export const CustomLinearGradient = ({ children }) => {
  return (
    <LinearGradient colors={[" rgb(0, 0, 0)", " rgb(64, 64, 64)"]}>{children}</LinearGradient>
  );
};
