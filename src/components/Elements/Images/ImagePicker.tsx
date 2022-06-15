import imageURL from "@/features/constatations/utils/ImageURL";
import { useNotificationStore } from "@/hooks/useNotificationStore";
import { ImageToSend } from "@/types";
import { Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import * as ExpoImagePicker from "expo-image-picker";
import React, { useEffect } from "react";
import { Image, Platform, useWindowDimensions, View } from "react-native";
import AddPhotoButton from "../Buttons/AddPhotoButton";
import { FloatingButtonStack } from "../Buttons/ButtonStack";
import EditButton from "../Buttons/EditButton";
import SaveButton from "../Buttons/SaveButton";

interface ImagePickerProps {
  image?: ImageToSend;
  onChange: (e: any) => void;
  onSubmit: () => void;
  displayPlaceholder?: boolean;
}

interface PickerStyleProps {
  width: number;
  height: number;
}

export default function ImagePicker({ image, onChange, onSubmit, displayPlaceholder = true }: ImagePickerProps): JSX.Element {
  const { addNotification } = useNotificationStore();

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const styles = useStyles({ width: windowWidth, height: windowHeight });

  useEffect((): void => {
    (async (): Promise<void> => {
      if (Platform.OS !== "web") {
        const { status } = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          addNotification({
            type: "error",
            title: "Désolé, la permission d'utiliser la caméra est requise",
          });
        }
      }
    })();
  }, []);

  const pickImage: () => Promise<void> = async (): Promise<void> => {
    const result: ExpoImagePicker.ImagePickerResult = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      onChange(result);
    }
  };

  return (
    <>
      <FloatingButtonStack>
        {image ? <EditButton callBack={pickImage} /> : <AddPhotoButton callBack={pickImage} />}
        {image && <SaveButton callBack={onSubmit} />}
      </FloatingButtonStack>
      {image ? <Image source={{ uri: image.uri }} style={styles.image} resizeMode="cover" /> : displayPlaceholder == true && <Image source={imageURL({ image: undefined })} style={styles.image} resizeMode="cover" />}
      <View style={styles.buttonContainer}></View>
    </>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme, props: PickerStyleProps) => ({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  image: {
    alignSelf: "center",
    margin: "auto",
    width: "100%",
    aspectRatio: 1 / 1,
  },
}));
