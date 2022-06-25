import ImagePicker from "@/components/Elements/Images/ImagePicker";
import NormalText from "@/components/Elements/Text/NormalText";
import { Constatation, ImageToSend } from "@/types";
import { Card, Colors, makeStyles, Theme } from "@rneui/themed";
import React, { useState } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { useUploadConstatationOtherImage } from "../../hooks/useUploadConstatationOtherImage";

interface AddAnotherImageProps {
  constatation: Constatation;
}

interface StyleProps {
  container: StyleProp<ViewStyle>;
}

export default function AddAnotherImage({ constatation }: AddAnotherImageProps): JSX.Element {
  const [image, setImage] = useState<ImageToSend | undefined>(undefined);

  const styles: StyleProps = useStyles();

  const uploadMutation = useUploadConstatationOtherImage();

  const onSubmit = async () => {
    image &&
      (await uploadMutation
        .mutateAsync({
          constatationId: constatation.id,
          image: image,
        })
        .then(() => setImage(undefined)));
  };

  return (
    <Card containerStyle={styles.container}>
      <NormalText boldText="Photographies complémentaires" text="N'hésitez pas à rajouter plus de photographies." />
      <ImagePicker image={image} onChange={setImage} onSubmit={onSubmit} displayPlaceholder={false} />
    </Card>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {},
}));
