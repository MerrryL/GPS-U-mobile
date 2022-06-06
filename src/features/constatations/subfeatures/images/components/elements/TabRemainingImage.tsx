import ImagePicker from "@/components/Elements/Images/ImagePicker";
import LongText from "@/components/Elements/Text/LongText";
import { Image as ImageType } from "@/types";
import { Colors, makeStyles, Theme } from "@rneui/themed";
import React, { useState } from "react";
import { View } from "react-native";
import { useDeleteConstatationImage } from "../../hooks/useDeleteConstatationImage";
import { useUploadConstatationImage } from "../../hooks/useUploadConstatationImage";

type TabRemainingImagesProps = {
  myImage: ImageType;
};

export default function TabRemainingImages({ myImage }: TabRemainingImagesProps) {
  const [image, setImage] = useState(null);
  const styles = useStyles();

  const imageUploadMutation = useUploadConstatationImage({
    image: image,
    imageId: myImage.id,
  });
  const imageDeleteMutation = useDeleteConstatationImage({
    imageId: myImage.id,
    constatationId: myImage.constatation_id,
  });

  const onSubmit = async () => {
    await imageUploadMutation.mutateAsync({
      image: image,
      imageId: myImage.id,
      constatationId: myImage.constatation_id,
    });
    setImage(null);
  };

  const onDeleteSubmit = async () => {
    await imageDeleteMutation.mutateAsync({
      constatationId: myImage.constatation_id,
      imageId: myImage.id,
    });
    setImage(null);
  };

  return (
    <View style={styles.container}>
      <LongText containerStyle={{ margin: "20px" }} boldText={myImage.name} text={myImage.description} />
      <ImagePicker image={image} onChange={setImage} onSubmit={onSubmit} />
    </View>
  );
}

const useStyles = makeStyles((theme:{ colors: Colors; } & Theme) => ({
  container: {},
});
