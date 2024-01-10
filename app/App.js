import { AuthProvider } from "./context/auth/auth.context";
import { Navigation } from "./navigation/navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
