import AddButton from "@/components/Elements/Buttons/AddButton";
import { FloatingButtonStack } from "@/components/Elements/Buttons/ButtonStack";
import ImagePicker from "@/components/Elements/Images/ImagePicker";
import NormalText from "@/components/Elements/Text/NormalText";
import { Image as ImageType, ImageToSend } from "@/types";
import { Card, Colors, makeStyles, Theme } from "@rneui/themed";
import React, { useState } from "react";
import { useDeleteConstatationImage } from "../../hooks/useDeleteConstatationImage";
import { useUploadConstatationImage } from "../../hooks/useUploadConstatationImage";

interface TabRemainingImagesProps {
  myImage: ImageType;
}

export default function TabRemainingImages({ myImage }: TabRemainingImagesProps) {
  const [image, setImage] = useState<ImageToSend | undefined>(undefined);
  const styles = useStyles();

  const imageUploadMutation = useUploadConstatationImage({
    image: image,
    imageId: myImage.id,
    constatationId: myImage.constatation_id,
  });
  const imageDeleteMutation = useDeleteConstatationImage({
    imageId: myImage.id,
    constatationId: myImage.constatation_id,
  });

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

  const onDeleteSubmit = async () => {
    await imageDeleteMutation.mutateAsync({
      constatationId: myImage.constatation_id,
      imageId: myImage.id,
    });
    setImage(undefined);
  };

  return (
    <Card containerStyle={styles.container}>
      <FloatingButtonStack>
        <AddButton callBack={() => console.log("test")}></AddButton>
      </FloatingButtonStack>
      <NormalText boldText={myImage.image_request?.name ?? "Autres"} text={myImage.image_request?.description ?? "Aucune description"} />

      <ImagePicker image={image} onChange={setImage} onSubmit={onSubmit} displayPlaceholder={false} />
    </Card>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {},
}));
