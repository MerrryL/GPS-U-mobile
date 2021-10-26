import React, { useState, useEffect } from "react";
import { Card, Chip, Button, Icon, Text, Input } from "react-native-elements";
import { Image, View, Platform, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useUploadConstatationImage } from "../hooks/useUploadConstatationImage";
import { useDeleteConstatationImage } from "../hooks/useDeleteConstatationImage";
import { useConstatationImage } from "../hooks/useConstatationImage";
import { useNotificationStore } from "@/hooks/useNotificationStore";


type ImagesPartViewProps = {
  constatationId: string;
  imageId: string;
  key: number;
};

export default function ImagesPartView({ constatationId, imageId }:ImagesPartViewProps) {
  const { addNotification } = useNotificationStore();
  const [image, setImage] = useState(null);
  const imageQuery = useConstatationImage({
      imageId: imageId,
      constatationId: constatationId,
  });

  const imageUploadMutation = useUploadConstatationImage({ image: image, imageId: imageId });
  const imageDeleteMutation = useDeleteConstatationImage({imageId: imageId, constatationId: imageQuery?.data?.constatation_id});

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          addNotification({
            type: "error",
            title: "Désolé, la permission d'utiliser la caméra est requise",
          });
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };
  
  const onSubmit = async () => {
    await imageUploadMutation.mutateAsync({
        image: image,
        imageId: imageId,
        constatationId: constatationId
    });
  };  

  const onDeleteSubmit = async () => {
    await imageDeleteMutation.mutateAsync({
        constatationId: imageQuery?.data?.constatation_id,
        imageId: imageId,
    });
    setImage(null);
  };

  return(
    <>
      <ScrollView >
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", margin:"10px" }}>
          <View style={{ flex: 1, justifyContent: "space-between", alignItems: "stretch", flexDirection: "row", width: "100%" }}>
            <Text style={{ alignSelf: "center"}} h2>{imageQuery?.data?.name}</Text>
            <Chip style={{ alignSelf: "flex-end", margin: "auto"}} title="Annuler" onPress={onDeleteSubmit} />
          </View>

          <Chip 
            title={image ? "Reprendre une photo" : "Prendre une photo"} 
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
            <>
              <Image
                source={{ uri: image.uri }}
                style={{ width: 200, height: 200 }}
              />
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
            </>
          )}
        </View>
      </ScrollView>
    </>
  )
}