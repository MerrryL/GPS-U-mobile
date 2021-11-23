import React, { useState, useEffect } from "react";
import { ImageToSend } from "@/types";
import NormalText from "@/components/Elements/Text/NormalText";
import { Card, Chip, Button, Icon, Text, Input, makeStyles } from "react-native-elements";
import { Image, View, Platform, ScrollView } from "react-native";
import * as ExpoImagePicker from "expo-image-picker";
import { useUploadConstatationImage } from "../../hooks/useUploadConstatationImage";
import { useDeleteConstatationImage } from "../../hooks/useDeleteConstatationImage";
import { useNotificationStore } from "@/hooks/useNotificationStore";
import imageURL from "@/features/constatations/utils/ImageURL";
import LongText from "@/components/Elements/Text/LongText";
import { useWindowDimensions } from 'react-native';

type ImagePickerProps={
    image: ImageToSend | null;
    onChange: any;
    onSubmit: any;
    displayPlaceholder?: boolean;

}

export default function ImagePicker({ image, onChange, onSubmit, displayPlaceholder = true}:ImagePickerProps){
    const { addNotification } = useNotificationStore();

    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;
    const styles = useStyles({width:windowWidth, height:windowHeight});
  

    useEffect(() => {
        (async () => {
          if (Platform.OS !== "web") {
            const { status } =
              await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
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
        let result = await ExpoImagePicker.launchImageLibraryAsync({
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


    return(
        <View style={styles.container}>
        { image 
            ? <Image
                source={{ uri: image.uri }}
                style={styles.image}
                resizeMode="cover"
            />
            : displayPlaceholder == true &&
                <Image
                    source={imageURL({image: null})}
                    style={styles.image}
                    resizeMode="cover"
                />
        }
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
    )
}
    
    
const useStyles = makeStyles((theme, props) => ({
    container: {},
    buttonContainer: {
        flexDirection: "row", 
        justifyContent: "flex-end"
    },
    image: {
        alignSelf: "center",
        margin: "auto",
        width: props.width*0.8,
        height: props.width*0.8,
    }
}));