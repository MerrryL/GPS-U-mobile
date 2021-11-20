import React, { useState } from "react";
import { StyleSheet, ScrollView, View, SafeAreaView, Dimensions } from 'react-native';

import { Button, Card, Chip, Input, ListItem, Text, Tile } from "react-native-elements";

import imageURL from "../../../utils/ImageURL";
import ImagesPartAdd from "./ImagesPartAdd";
import ImagesPartView from "./ImagesPartView";
import { useImages } from "../hooks/useConstatationImages";
import { useDefineAsThumbConstatationImage } from "../hooks/useDefineAsThumbConstatationImage";
import { useDeletePictureConstatationImage } from "../hooks/useDeletePictureConstatationsImage";

type ImagesPartProps = {
  constatationId: string;
};

export function ImagesPart({ constatationId = null }:ImagesPartProps) {
  const ImagesQuery = useImages({
    constatationId: constatationId,
  });

  const useDefineAsThumbMutation = useDefineAsThumbConstatationImage({constatationId: constatationId});
  const useDeletePictureMutation = useDeletePictureConstatationImage({constatationId:constatationId});

  let ImagesWithMedia = [];
  let ImagesWithoutMedia = [];

  ImagesQuery?.data?.map(image => {
    if (image?.media?.length>0) {
      ImagesWithMedia.push(image)
    }
    else {
      ImagesWithoutMedia.push(image);
    }
  });

  const defineAsThumb = async (imageId, constatationId) => {
    await useDefineAsThumbMutation.mutateAsync({
      imageId: imageId,
      constatationId: constatationId,
    });
  };

  const deletePicture = async( imageId, constatationId) => {
    await useDeletePictureMutation.mutateAsync({
      imageId: imageId,
      constatationId: constatationId
    })
  };

  return ( 
    <View>
      
      <Text>{ImagesWithoutMedia?.length ?? '0'} photo(s) demandent d'être prises</Text>

      {ImagesWithoutMedia.map((image, index) => (
        <ImagesPartView constatationId={constatationId} imageId={image?.id?.toString()} key={index}/>
      ))}

      <Text>{ImagesWithMedia?.length ?? '0'} photo(s) déjà prises</Text>

      <ScrollView>
        {ImagesWithMedia.map((image, index) => (
          <View key={index}>
            <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
              <Chip
                title="Définir comme image par défaut"
                onPress={() => defineAsThumb(image.id, image.constatation_id)}
                icon={{
                name: "file-image-o",
                type: "font-awesome",
                size: 20,
                color: "white",
                }}
                iconRight
              />
              <Chip
                title="Supprimer cette image"
                onPress={() => deletePicture(image.id, image.constatation_id)}
                icon={{
                name: "close",
                type: "font-awesome",
                size: 20,
                color: "white",
                }}
                iconRight
              />
            </View>
            <Tile
              imageSrc={imageURL({image})}
              title={image.name}
              caption={image.text}
            />
          </View>  
        ))
        }
      </ScrollView>
      <View>
        <ImagesPartAdd constatationId={constatationId}/>
      </View>
    </View>
  );
}
