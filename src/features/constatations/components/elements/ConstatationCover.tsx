import imageURL from "@/features/constatations/utils/ImageURL";
import React from "react";
import { View } from "react-native";
import { Image, makeStyles, Text } from "react-native-elements";

export default function ConstatationCover(props) {
  const { cover, images } = props;

  const styles = useStyles();

  const url = imageURL({ image: cover });
  const length = images
    ? images.filter((image) => image.media.length > 0).length
    : 0;

  return (
    <View style={styles.container}>
      <Image source={url} resizeMode="cover" style={styles.cover} />
      <Text style={{ marginBottom: 10 }}>
        {length > 1
          ? length + " photos"
          : length > 0
          ? "Une photo"
          : "Pas de photo"}
      </Text>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: "column",
  },
  cover: {
    width: 150,
    height: 150,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "black",
  },
}));
