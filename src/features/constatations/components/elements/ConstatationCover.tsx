import NormalText from "@/components/Elements/Text/NormalText";
import imageURL from "@/features/constatations/utils/ImageURL";
import { Image as MyImage, Media } from "@/types";
import { Card, Colors, Image, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";
import { ImageStyle, StyleProp, ViewStyle } from "react-native";

interface StyleProps {
  container: StyleProp<ViewStyle>;
  cover: StyleProp<ImageStyle>;
}

interface ConstatationCoverProps {
  cover?: Media;
  images: MyImage[];
}

export default function ConstatationCover({ cover, images }: ConstatationCoverProps): JSX.Element {
  const styles: StyleProps = useStyles();

  const url = imageURL({ image: cover });

  const length = images ? images.filter((image) => image.media.length > 0).length : 0;
  const photoAmount = length > 1 ? length + " photos" : length > 0 ? "Une photo" : "Pas de photo";

  return (
    <Card containerStyle={styles.container}>
      <Image source={url} resizeMode="cover" style={styles.cover} />
      <NormalText text={photoAmount} />
    </Card>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
    flexDirection: "column",
    flexGrow: 1,
    padding: 5,
    margin: 5,
    alignItems: "center",
  },
  cover: {
    width: 180,
    height: 180,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 3,
    padding: 5,
    margin: 5,
    marginRight: 15,
    borderColor: "black",
  },
}));
