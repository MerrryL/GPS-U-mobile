import { FloatingButtonStack } from "@/components/Elements/Buttons/ButtonStack";
import DeleteButton from "@/components/Elements/Buttons/DeleteButton";
import StarButton from "@/components/Elements/Buttons/StarButton";
import imageURL from "@/features/constatations/utils/ImageURL";
import { Image as ImageType } from "@/types";
import { Card, Colors, Image, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";
import { ImageStyle, StyleProp, ViewStyle } from "react-native";
import { useDefineAsThumbConstatationImage } from "../../hooks/useDefineAsThumbConstatationImage";
import { useDeletePictureConstatationImage } from "../../hooks/useDeletePictureConstatationsImage";

interface ConstatationGalleryImageProps {
  image: ImageType;
}

interface StyleProps {
  container: StyleProp<ViewStyle>;
  image: StyleProp<ImageStyle>;
  buttonContainer: StyleProp<ViewStyle>;
}
export default function TabImage({ image }: ConstatationGalleryImageProps): JSX.Element {
  const styles: StyleProps = useStyles();

  const useDefineAsThumbMutation = useDefineAsThumbConstatationImage({
    imageId: image.id,
    constatationId: image.constatation_id,
  });
  const useDeletePictureMutation = useDeletePictureConstatationImage({
    imageId: image.id,
    constatationId: image.constatation_id,
  });

  const defineAsThumb = async () => {
    await useDefineAsThumbMutation.mutateAsync({
      imageId: image.id,
      constatationId: image.constatation_id,
    });
  };

  const deletePicture = async () => {
    await useDeletePictureMutation.mutateAsync({
      imageId: image.id,
      constatationId: image.constatation_id,
    });
  };

  return (
    <Card containerStyle={styles.container}>
      <FloatingButtonStack>
        <StarButton callBack={defineAsThumb} />
        {/* <SaveButton callBack={deletePicture} /> */}
        <DeleteButton callBack={deletePicture} />
      </FloatingButtonStack>
      <Image style={styles.image} resizeMode="cover" source={imageURL({ image: image.media[0] })} />
    </Card>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
    minHeight: 150,
    display: "flex",
    alignItems: "stretch",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  image: {
    aspectRatio: 1 / 1,
  },
}));
