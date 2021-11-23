import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Linking, TouchableOpacity } from "react-native";

import MapView, { Marker} from "react-native-maps";
import { Chip, Tile, makeStyles, Image } from "react-native-elements";

type MarkerType = {
    latitude: string | number;
    longitude: string | number;
}


type MapProps = {
    markers?: MarkerType[];
    onChange: any;
}
export default function MapForMobile({markers, onChange}:MapProps) {
    const styles = useStyles();

    //TODO:the initialRegion should adapt the latitude/long Delta?
    const defaultCoords = {
        latitude: "50.509317",
        longitude: "3.590973",
    };
  
    const initialRegion = {
        latitude: parseFloat(defaultCoords.latitude),
        longitude: parseFloat(defaultCoords.longitude),
        latitudeDelta: 0.002,
        longitudeDelta: 0.001,
    };

    const onDragEnd = (marker) => {
        console.log("props", marker);
        onChange({
            latitude: marker.coordinate.lat() as number,
            longitude: marker.coordinate.lng() as number, 
        });
    };

    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={initialRegion}>
                { markers && markers.map( (marker, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: marker?.latitude != null ? parseFloat(marker?.latitude?.toString()) : initialRegion.latitude,
                            longitude: marker?.longitude != null ? parseFloat(marker?.longitude?.toString()) : initialRegion.longitude,
                            }}
                        draggable
                        onDragEnd={onDragEnd}
                        title="Ici"
                        description="Vous êtes ici"
                    />
                ))}
            </MapView>
        </View>
    )
}

const useStyles = makeStyles((theme, props) => ({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        margin: 10
    },
    map: {
        width: 0.8 * Dimensions.get("window").width,
        height: 0.8 * Dimensions.get("window").width,
    },
}));
  