import imageURL from "@/features/constatations/utils/ImageURL";
import { useNotificationStore } from "@/hooks/useNotificationStore";
import { ImageToSend } from "@/types";
import * as ExpoImagePicker from "expo-image-picker";
import React, { useEffect } from "react";
import { Image, Platform, useWindowDimensions, View } from "react-native";
import { Chip, FullTheme, makeStyles } from "react-native-elements";

type ImagePickerProps = {
  image: ImageToSend | null;
  onChange: any;
  onSubmit: any;
  displayPlaceholder?: boolean;
};

type PickerStyleProps = {
  width: number;
  height: number;
};

export default function ImagePicker({ image, onChange, onSubmit, displayPlaceholder = true }: ImagePickerProps):JSX.Element {
  const { addNotification } = useNotificationStore();

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const styles = useStyles({ width: windowWidth, height: windowHeight });

  useEffect(():void => {
    (async ():Promise<void> => {
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

  const pickImage:() => Promise<void> = async ():Promise<void> => {
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
    <View style={styles.container}>
      {image ? <Image source={{ uri: image.uri }} style={styles.image} resizeMode="cover" /> : displayPlaceholder == true && <Image source={imageURL({ image: null })} style={styles.image} resizeMode="cover" />}
      <View style={styles.buttonContainer}>
        <Chip
          title={image ? "Reprendre la photo" : "Prendre une photo"}
          onPress={pickImage}
          icon={{
            name: "file-image-o",
            type: "font-awesome",
            size: 20,
            color: "white",
          }}
          iconRight
        />
        {image && (
          <Chip
            title="Sauvegarder cette photo"
            onPress={onSubmit}
            icon={{
              name: "save",
              type: "font-awesome",
              size: 20,
              color: "white",
            }}
            iconRight
          />
        )}
      </View>
    </View>
  );
}

const useStyles = makeStyles((theme: Partial<FullTheme>, props: PickerStyleProps) => ({
  container: {},
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  image: {
    alignSelf: "center",
    margin: "auto",
    width: props.width * 0.8,
    height: props.width * 0.8,
  },
}));
