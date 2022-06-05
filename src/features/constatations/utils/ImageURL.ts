import { Media } from "@/types/";
import Constants from "expo-constants";
import { ImageSourcePropType } from "react-native";

type ImageURLProps = {
  image: Media | undefined;
};

export default function imageURL({ image }: ImageURLProps):ImageSourcePropType {
  const { file_name, name, id } = image || {};

  if (!file_name || !name) {
    return require("@/assets/images/empty.svg");
  }

  const extension = file_name.substr(name?.length);

  const path = Constants?.manifest?.extra?.API_URL + "images/" + id + "/" + file_name;

  return { uri: path };
}
