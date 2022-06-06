import ImagePicker from "@/components/Elements/Images/ImagePicker";
import NormalText from "@/components/Elements/Text/NormalText";
import { Colors, makeStyles, Theme } from "@rneui/themed";
import React, { useState } from "react";
import { View } from "react-native";
import { useUploadConstatationOtherImage } from "../../hooks/useUploadConstatationOtherImage";

type AddAnotherImageProps = {
  constatationId: number;
};

export default function AddAnotherImage({ constatationId }: AddAnotherImageProps) {
  console.log("props", constatationId);

  const [image, setImage] = useState(null);

  const styles = useStyles();

  const uploadMutation = useUploadConstatationOtherImage({
    constatationId: constatationId,
    image: image,
  });

  const onSubmit = async () => {
    image &&
      (await uploadMutation.mutateAsync({
        constatationId: constatationId,
        image: image,
      }));
    setImage(null);
  };

  return (
    <View style={styles.container}>
      <NormalText boldText="Prenez d'autres photographies" />
      <ImagePicker image={image} onChange={setImage} onSubmit={onSubmit} displayPlaceholder={false} />
    </View>
  );
}

const useStyles = makeStyles((theme:{ colors: Colors; } & Theme) => ({
  container: {},
});
