import { useRef, useState, useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import imagePaths from "../constants/imagePaths";
import { locationPermission } from "../helper/helperFunction";

const GOOGLE_MAPS_APIKEY = "AIzaSyDnSNNGQQ8AhLEmcsXJbmz1_MVrbOz55rM";
const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function Home({ navigation }) {
  useEffect(() => {
    getCurrentLocation();
  }, []);
  const getCurrentLocation = async () => {
    locationPermission();
  };

  const [state, setState] = useState({
    startingCords: {
      latitude: 24.848570187592856,
      longitude: 89.37317584982956,
    },
    destinationCords: {
      latitude: 24.861863761365775,
      longitude: 89.37841390774146,
    },
  });

  const mapRef = useRef();
  const { startingCords, destinationCords } = state;

  onPressLocation = () => {
    navigation.navigate("chooseLocation", { getCordinates: fetchValue });
  };

  const fetchValue = (data) => {
    setState({
      startingCords: {
        latitude: data.pickupCords.latitude,
        longitude: data.pickupCords.longitude,
      },
      destinationCords: {
        latitude: data.destinationCords.latitude,
        longitude: data.destinationCords.longitude,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          initialRegion={{
            ...startingCords,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          <Marker
            coordinate={startingCords}
            image={imagePaths.currentLocation}
          />
          <Marker
            coordinate={destinationCords}
            image={imagePaths.greenMarker}
          />
          <MapViewDirections
            origin={startingCords}
            destination={destinationCords}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
            optimizeWaypoints={true}
            onReady={(result) => {
              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: 30,
                  bottom: 300,
                  left: 30,
                  top: 100,
                },
              });
            }}
          />
        </MapView>
      </View>
      <View style={styles.bottomCard}>
        <Text>Where you want to go...</Text>
        <TouchableOpacity style={styles.inpuStyle} onPress={onPressLocation}>
          <Text>Choose your Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomCard: {
    backgroundColor: "white",
    width: "100%",
    padding: 30,
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
  },
  inpuStyle: {
    backgroundColor: "white",
    borderRadius: 4,
    borderWidth: 1,
    alignItems: "center",
    height: 48,
    justifyContent: "center",
    marginTop: 16,
  },
});

export default Home;
