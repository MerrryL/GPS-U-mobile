import React, { useState } from "react";
import { StyleSheet, ScrollView, View, SafeAreaView, Dimensions } from 'react-native';

import { Card, Button, Tile, Text, Input } from "react-native-elements";

import imageURL from "../../../utils/ImageURL";
import { ImagesPartAdd } from "./ImagesPartAdd";
import { ImagesPartView } from "./ImagesPartView";
import { useImages } from "../hooks/useImages";
import { useDefineAThumb } from "../hooks/useDefineAThumb";

type ImagesPartProps = {
  constatationId: string;
};

export function ImagesPart({ constatationId = null }:ImagesPartProps) {
  // const [activeIndex, setActiveIndex] = useState({
  //   activeIndex:0
  // });

  const ImagesQuery = useImages({
    constatationId: constatationId,
  });

  const useDefineAThumbMutation = useDefineAThumb({constatationId: constatationId});

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

  const defineAThumb = async (imageId, constatationId) => {
    await useDefineAThumbMutation.mutateAsync({
      imageId: imageId,
      constatationId: constatationId,
    });
    //onSuccess();
  };

  return ( 
    <View>
      <View>
        <ImagesPartAdd constatationId={constatationId}/>
      </View>

      <Text>{ImagesWithoutMedia?.length ?? '0'} photo(s) demandent d'être prises</Text>
        {ImagesWithoutMedia.map((image, index) => (
          <ImagesPartView imageId={image?.id?.toString()} key={index}/>
        ))}

      <ScrollView>
        <Text>{ImagesWithMedia?.length ?? '0'} photo(s) déjà prises</Text>
          {ImagesWithMedia.map((image, index) => (
              <>
              <Tile
              imageSrc={{ uri: imageURL({image}) }}
              title={image.name}
              caption={image.text}
              key={index}
            />
            <Button onPress={() => defineAThumb(image.id, image.constatation_id)} title="Thumb"/>
              </>
              
          ))
          }
      </ScrollView>
    </View>
    
  );
}
