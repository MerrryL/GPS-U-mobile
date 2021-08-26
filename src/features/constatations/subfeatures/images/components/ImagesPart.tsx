import React, { useState } from "react";
import { StyleSheet, ScrollView, View, SafeAreaView, Dimensions } from 'react-native';

import { Card, Button, Tile, Text, Input } from "react-native-elements";

import imageURL from "../../../utils/ImageURL";
import { ImagesPartAdd } from "./ImagesPartAdd";
import { ImagesPartView } from "./ImagesPartView";
import { useImages } from "../hooks/useImages";

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
              <Tile
              imageSrc={{ uri: imageURL({image}) }}
              title={image.name}
              caption={image.text}
              key={index}
            />
          ))
          }
      </ScrollView>
    </View>
    
  );
}
