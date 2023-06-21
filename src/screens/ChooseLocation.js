import { View, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import AddressPickup from "../components/addressPickup";
import CustomBtn from "../components/customButton";
import { useNavigation } from "@react-navigation/native";
import { showError, showSuccess } from "../helper/helperFunction";

const ChooseLocation = (props) => {
  const navigation = useNavigation();

  const [state, setState] = useState({
    pickupCords: {},
    destinationCords: {},
  });
  const { pickupCords, destinationCords } = state;

  const checkValid = () => {
    if (Object.keys(pickupCords).length === 0) {
      showError("Please enter your pickup location");
      return false;
    }
    if (Object.keys(destinationCords).length === 0) {
      showError("Please enter your pickup location");
      return false;
    }
    return true;
  };

  const onDone = () => {
    const isValid = checkValid();
    if (isValid) {
      props.route.params.getCordinates({
        pickupCords,
        destinationCords,
      });
      showSuccess("Now you can get your location");
      navigation.goBack();
    }
  };

  const fetchAddressCords = (lat, lng) => {
    setState({
      ...state,
      pickupCords: {
        latitude: lat,
        longitude: lng,
      },
    });
  };
  const fetchDestinationCords = (lat, lng) => {
    setState({
      ...state,
      destinationCords: {
        latitude: lat,
        longitude: lng,
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* <ScrollView style={{ padding: 24 }} keyboardShouldPersistTaps="handled"> */}
      <AddressPickup
        placheholderText="Enter Pickup Location"
        fetchAddress={fetchAddressCords}
      />
      <View style={{ marginBottom: 16 }} />
      <AddressPickup
        placheholderText="Enter Destination Location"
        fetchAddress={fetchDestinationCords}
      />
      {/* </ScrollView> */}

      {/* <View style={{ paddingHorizontal: 16 }}></View> */}
      <CustomBtn btnText="Done" onPress={onDone} btnStyle={{ marginTop: 24 }} />

      {/* <ScrollView style={{ padding: 24 }}>
      
      </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default ChooseLocation;
