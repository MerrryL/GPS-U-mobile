import ImagePicker from "@/components/Elements/Images/ImagePicker";
import NormalText from "@/components/Elements/Text/NormalText";
import { Image as ImageType, ImageToSend } from "@/types";
import { Card, Colors, makeStyles, Theme } from "@rneui/themed";
import React, { useState } from "react";
import { useUploadConstatationImage } from "../../hooks/useUploadConstatationImage";

interface TabRemainingImagesProps {
  myImage: ImageType;
}

export default function TabRemainingImages({ myImage }: TabRemainingImagesProps) {
  const [image, setImage] = useState<ImageToSend | undefined>(undefined);
  const styles = useStyles();

  const imageUploadMutation = useUploadConstatationImage();


  const onSubmit = async () => {
    if (image) {
      await imageUploadMutation.mutateAsync({
        image: image,
        imageId: myImage.id,
        constatationId: myImage.constatation_id,
      });
    }
    setImage(undefined);
  };

  return (
    <Card containerStyle={styles.container}>

      <NormalText boldText={myImage.image_request?.name ?? "Autres"} text={myImage.image_request?.description ?? "Aucune description"} />

      <ImagePicker image={image} onChange={setImage} onSubmit={onSubmit} displayPlaceholder={false} />
    </Card>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {},
}));
