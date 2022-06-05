import AddButton from "@/components/Elements/Buttons/AddButton";
import { FloatingButtonStack } from "@/components/Elements/Buttons/ButtonStack";
import { ImageRequest, Observation } from "@/types";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Card, FullTheme, makeStyles } from "react-native-elements";
import { useAttachObservationToImageRequest } from "../hooks/useAttachObservationToImageRequest";
import { useImageRequests } from "../hooks/useImageRequests";

interface ImageRequestPartViewProps {
  observation: Observation;
}

interface StyleProps {
  container: StyleProp<ViewStyle>;
  cardTitle: StyleProp<ViewStyle>;
  body: StyleProp<ViewStyle>;
}

export default function ImagesPartSelector({ observation }: ImageRequestPartViewProps): JSX.Element {
  const styles: StyleProps = useStyles();

  const ImagesQuery = useImageRequests();

  const observationImageRequests = observation.image_requests.map((imRequest: ImageRequest) => imRequest.id);

  const attachObservationToImageMutation = useAttachObservationToImageRequest();

  const onAttach = (imageRequest: ImageRequest) => {
    attachObservationToImageMutation.mutateAsync({
      observationId: observation.id,
      imageRequestId: imageRequest.id,
    });
  };

  return (
    <>
      {ImagesQuery?.data
        ?.filter((imageRequest: ImageRequest) => !observationImageRequests.includes(imageRequest.id))
        .map(
          (imageRequest: ImageRequest, index: number): JSX.Element => (
            // <ImagesPartView observation={observation} image={image} key={index} />
            <Card containerStyle={styles.container} key={index}>
              <FloatingButtonStack>
                <AddButton callBack={() => onAttach(imageRequest)} />
              </FloatingButtonStack>
              <Card.FeaturedTitle style={styles.cardTitle}>{imageRequest.name}</Card.FeaturedTitle>
              <Card.FeaturedSubtitle style={styles.cardTitle}>Description: {imageRequest.description}</Card.FeaturedSubtitle>
            </Card>
          )
        )}
    </>
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
