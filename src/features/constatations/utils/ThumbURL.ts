import React from "react";
import Constants from "expo-constants";
import { Image } from "../types/";

type thumbURLProps = {
  image: Image;
};

export default function thumbURL({ image }: thumbURLProps) {
  const extension = image?.media[0]?.file_name.substr(
    image?.media[0].name?.length
  );

  const path =
    Constants.manifest.extra.API_URL +
    "images/" +
    image?.id +
    "/conversions/" +
    image?.media[0]?.name +
    "-thumb" +
    extension;

  return path;
}
