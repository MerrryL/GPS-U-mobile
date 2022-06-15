import AddButton from "@/components/Elements/Buttons/AddButton";
import { FloatingButtonStack } from "@/components/Elements/Buttons/ButtonStack";
import NormalText from "@/components/Elements/Text/NormalText";
import { ImageRequest, Observation } from "@/types";
import { Card, Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { useAttachObservationToImageRequest } from "../hooks/useAttachObservationToImageRequest";
import { useImageRequests } from "../hooks/useImageRequests";

interface ImageRequestPartViewProps {
  observation: Observation;
}

interface StyleProps {
  container: StyleProp<ViewStyle>;
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
              <NormalText boldText={imageRequest.name} text={imageRequest.description} />
            </Card>
          )
        )}
    </>
  );
}
const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
    backgroundColor: theme?.colors?.white,
  },
}));
