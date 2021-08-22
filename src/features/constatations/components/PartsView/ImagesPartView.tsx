import React, { useState, useEffect } from "react";
import { Card, Button, Icon, Text, Input } from "react-native-elements";
import { useImage } from "../../hooks/parts/images/useImage";
import { Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useUploadImage } from "../../hooks/parts/images/useUploadImage";

type ImagesPartViewProps = {
    imageId: string;
    key: number;
};

export function ImagesPartView({ imageId }:ImagesPartViewProps) {
  const [image, setImage] = useState(null);
  const imageQuery = useImage({
      imageId: imageId,
  });

  const imageUploadMutation = useUploadImage({ image: image, imageId: imageId })

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
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

    console.log(result);

    if (!result.cancelled) {
      setImage(result);
    }
  };

  
  const onSubmit = async () => {
    console.log('imageToSend', image);
    await imageUploadMutation.mutateAsync({
        image: image,
        imageId: imageId,
    });
    setImage(null);
  };  

  return(
  <>
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text h1> {imageQuery?.data?.name}</Text>
      <Button title="Prends une photo" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 200, height: 200 }}
        />
      )}
    </View>

    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Upload là" onPress={onSubmit} />
    </View>

  </>

  )
}