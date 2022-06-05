import { FloatingButtonStack } from "@/components/Elements/Buttons/ButtonStack";
import DeleteButton from "@/components/Elements/Buttons/DeleteButton";
import { ImageRequest, Observation } from "@/types";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Card, FullTheme, makeStyles } from "react-native-elements";
import { useDeleteObservationImage } from "../hooks/useDeleteObservationImage";

interface ImagesPartViewProps {
  observation: Observation;
  imageRequest: ImageRequest;
  key: number;
}

interface StyleProps {
  container: StyleProp<ViewStyle>;
  cardTitle: StyleProp<ViewStyle>;
  body: StyleProp<ViewStyle>;
}

export default function ImagesPartView({ observation, imageRequest }: ImagesPartViewProps): JSX.Element {
  const styles: StyleProps = useStyles();

  const imageDeleteMutation = useDeleteObservationImage({
    imageRequestId: imageRequest.id,
    observationId: observation.id,
  });

  const onDeleteSubmit = async () => {
    await imageDeleteMutation.mutateAsync({
      observationId: observation.id,
      imageRequestId: imageRequest.id,
    });
  };

  return (
    <Card containerStyle={styles.container}>
      <FloatingButtonStack>
        <DeleteButton callBack={onDeleteSubmit} />
      </FloatingButtonStack>
      <Card.FeaturedTitle style={styles.cardTitle}>{imageRequest.name}</Card.FeaturedTitle>
      <Card.FeaturedSubtitle style={styles.cardTitle}>Description: {imageRequest.description}</Card.FeaturedSubtitle>
    </Card>
  );
}
const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  container: {
    backgroundColor: theme.colors?.grey5,
  },
  cardTitle: {
    alignSelf: "stretch",
    padding: 2,
    marginBottom: 0,
    backgroundColor: theme.colors?.primary,
  },
  body: {},
}));
