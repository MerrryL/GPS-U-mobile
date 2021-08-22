import React from "react";
import Constants from "expo-constants";
import { Image } from "../types/";

type thumbURLProps = {
  image: Image;
};

export default function thumbURL({ image }: thumbURLProps) {
  //Todo: fix this bad thing
  if  (!image?.media  || !image?.media[0]?.file_name) {
    return "http://127.0.0.1:8000/images/53/conversions/sgriM5lGVx0-thumb.jpg";
  }

  const extension = image?.media[0]?.file_name.substr(
    image?.media[0]?.name?.length
  );

  const path =
    Constants.manifest.extra.API_URL +
    "images/" +
    image?.media[0]?.id +
    "/conversions/" +
    image?.media[0]?.name +
    "-thumb" +
    extension;
    
  return path;
}
