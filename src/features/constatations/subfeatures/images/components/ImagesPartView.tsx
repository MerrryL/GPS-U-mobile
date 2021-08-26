import React, { useState, useEffect } from "react";
import { Card, Button, Icon, Text, Input } from "react-native-elements";
import { Image, View, Platform, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
<<<<<<< HEAD:src/features/constatations/subfeatures/images/components/ImagesPartView.tsx
import { useUploadImage } from "../hooks/useUploadImage";
import { useDeleteImage } from "../hooks/useDeleteImage";
import { useImage } from "../hooks/useImage";

=======
import { useUploadImage } from "../../hooks/parts/images/useUploadImage";
import { useDeleteImage } from "../../hooks/parts/images/useDeleteImage";
>>>>>>> ba2eafa75f8d6794619496d6b4b587a224df979b:src/features/constatations/components/PartsView/ImagesPartView.tsx

type ImagesPartViewProps = {
    imageId: string;
    key: number;
};

export function ImagesPartView({ imageId }:ImagesPartViewProps) {
  const [image, setImage] = useState(null);
  const imageQuery = useImage({
      imageId: imageId,
  });

  const imageUploadMutation = useUploadImage({ image: image, imageId: imageId });
  const imageDeleteMutation = useDeleteImage({imageId: imageId, constatationId: imageQuery?.data?.constatation_id});

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
  //const mutation = useMutation((image) => uploadImage(image))
  
  const onSubmit = async () => {
<<<<<<< HEAD:src/features/constatations/subfeatures/images/components/ImagesPartView.tsx
=======
    //todo: pause
>>>>>>> ba2eafa75f8d6794619496d6b4b587a224df979b:src/features/constatations/components/PartsView/ImagesPartView.tsx
    await imageUploadMutation.mutateAsync({
        image: image,
        imageId: imageId,
    });
        //onSuccess();
  };  

  const onDeleteSubmit = async () => {
    //todo: pause
    await imageDeleteMutation.mutateAsync({
        constatationId: imageQuery?.data?.constatation_id,
        imageId: imageId,
    });
    setImage(null);
  };
  const onDeleteSubmit = async () => {
    //todo: pause
    await imageDeleteMutation.mutateAsync({
        constatationId: imageQuery?.data?.constatation_id,
        imageId: imageId,
    });
    setImage(null);
  };  

  return(
<<<<<<< HEAD:src/features/constatations/subfeatures/images/components/ImagesPartView.tsx
    <>
      <ScrollView >
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", margin:"10px" }}>
          <Text h2>{imageQuery?.data?.name}</Text>
          <Button title="Supprimer l'image" onPress={onDeleteSubmit} />
=======
  <View>
    <Text h1>{imageQuery?.data?.name}</Text>
    <Button title="Supprimer l'image" onPress={onDeleteSubmit} />
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>  
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 300, height: 300 }}
        />
      )}
    </View>

    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Button title="Prends une photo" onPress={pickImage} />
    <Button title="Upload là" onPress={onSubmit} />
    </View>

  </View>
>>>>>>> ba2eafa75f8d6794619496d6b4b587a224df979b:src/features/constatations/components/PartsView/ImagesPartView.tsx

          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && (
            <Image
              source={{ uri: image.uri }}
              style={{ width: 200, height: 200 }}
            />
          )}
          <Button title="Send to Network" onPress={onSubmit} />
        </View>
      </ScrollView>
    </>
  )
}