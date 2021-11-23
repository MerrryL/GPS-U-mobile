import Constants from "expo-constants";
import { Media } from "@/types/";

type ImageURLProps = {
  image: Media | null;
};

export default function imageURL({ image }: ImageURLProps) {
  const { file_name = null, name = null, id} = image || {};
  
  if (!file_name || !name) {
    return require('@/assets/images/empty.svg');
  } 
   
  const extension = file_name.substr(
    name?.length
  );

  const path = 
    Constants?.manifest?.extra?.API_URL +
    "images/" +
    id +
    "/"+
    file_name;

  return { uri: path};
}
