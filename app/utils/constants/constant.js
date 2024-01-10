import { Dimensions } from "react-native";
import { StatusBar } from "react-native";

export const DeviceInfo = {
  notchHeight: StatusBar.currentHeight,
  screenHeight: Dimensions.get("screen").height
};

export const tokens = {
  authToken:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzaXRlIjoic21hcnR0b2RvIiwiaWQiOiJleUpoYkdjaU9pSklVekkxTmlKOS5leUpsYldGcGJDSTZJbU52WkdWM2FYUm9jbUZvZFd4dWFXdGhiVUJuYldGcGJDNWpiMjBpZlEud2hWOWFTWlZGWXd0U0hwX1BBbXAta1laZXRTbUZDX1J0Z2VINFNaREhHUSJ9.bNHtX2BTpOIzpLPBhj93IgmPKxJFJfP1eRgx3WBrkeU"
};
