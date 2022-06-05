import { ImageRequest, Observation } from "@/types";
import React from "react";
import { useImages } from "../hooks/useObservationImages";
import ImagesPartAdd from "./ImagesPartAdd";
import ImagesPartView from "./ImagesPartView";

interface ImagesPartProps {
  observation: Observation;
}

export function ImagesPart({ observation }: ImagesPartProps): JSX.Element {
  const ImageRequestsQuery = useImages({
    observationId: observation.id,
  });

  return (
    <>
      {ImageRequestsQuery?.data?.map(
        (imageRequest: ImageRequest, index: number): JSX.Element => (
          <ImagesPartView observation={observation} imageRequest={imageRequest} key={index} />
        )
      )}
      <ImagesPartAdd observation={observation} />
    </>
  );
}
