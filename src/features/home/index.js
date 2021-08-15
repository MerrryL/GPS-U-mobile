import React, { useState, useEffect } from "react";

import { Image, View, Platform } from "react-native";
import { Button } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
//import * as ImageManipulator from "expo-image-manipulator";
//import { useMutation } from "react-query";
import { uploadImage } from "../constatations/api/constatations";
//import { useForm, Controller } from "react-hook-form";

function Home({ navigation }) {
  const [image, setImage] = useState(null);

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
      base64: true
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result);
    }
  };
  //const mutation = useMutation((image) => uploadImage(image));

  const sendToNetwork = async () => {
    console.log("form", image);
    /*const image2 = await ImageManipulator.manipulateAsync(image.uri, [], {
      base64: true
    });*/

    uploadImage(image);
  };

  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && (
          <Image
            source={{ uri: image.uri }}
            style={{ width: 200, height: 200 }}
          />
        )}
      </View>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="Send to Network" onPress={sendToNetwork} />
      </View>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          title="Constatations"
          onPress={() => navigation.navigate("Constatations")}
        />

        <Button title="Retour " onPress={() => navigation.goBack()} />
      </View>
    </>
  );
}

export default Home;
