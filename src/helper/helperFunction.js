import { showMessage } from "react-native-flash-message";
import * as Location from "expo-location";
import { useEffect, useState } from "react";

export const locationPermission = () => {
  const [location, setLocation] = useState();

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("please grant location");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log(currentLocation);
      console.log("Location: ");
      console.log(currentLocation);
    };
    getPermissions();
  }, []);
};

const showError = (message) => {
  showMessage({
    message,
    type: "danger",
    icon: "danger",
  });
};

const showSuccess = (message) => {
  showMessage({
    message,
    type: "success",
    icon: "success",
  });
};

export { showError, showSuccess };
