import React from "react";
import { StyleSheet, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const AddressPickup = ({ placheholderText, fetchAddress }) => {
  const onPressAddress = (data, details) => {
    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    fetchAddress(lat, lng);
  };
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder={placheholderText}
        onPress={onPressAddress}
        fetchDetails={true}
        query={{
          key: "AIzaSyDnSNNGQQ8AhLEmcsXJbmz1_MVrbOz55rM",
          language: "en",
        }}
        styles={{
          textInputContainer: styles.containerStyle,
          textInput: styles.textInputStyle,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerStyle: {
    backgroundColor: "white",
  },
  textInputStyle: {
    height: 48,
    color: "black",
    fontSize: 16,
    backgroundColor: "#f3f3f3",
  },
});

export default AddressPickup;
