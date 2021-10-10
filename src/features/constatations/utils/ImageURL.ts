import Constants from "expo-constants";
import { Constatation, Image } from "@/types/";

type ImageURLProps = {
  image: Image | Constatation;
};

export default function imageURL({ image }: ImageURLProps) {
  //Todo: fix this bad thing
  if (!image?.media  || !image?.media[0]?.file_name) {
    return require('../../../assets/images/empty.svg');
  }

  const extension = image?.media[0]?.file_name.substr(
    image?.media[0].name?.length
  );

  const path = 
    Constants.manifest.extra.API_URL +
    "images/" +
    image?.media[0]?.id +
    "/"+
    image?.media[0]?.file_name;

  return { uri: path};
}
