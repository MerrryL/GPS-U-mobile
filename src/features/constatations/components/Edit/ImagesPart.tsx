import React, { useState } from "react";
import { StyleSheet, ScrollView, View, SafeAreaView, Dimensions } from 'react-native';

import { Card, Button, Tile, Text, Input } from "react-native-elements";
import { useImages } from "../../hooks/parts/images/useImages";
import { ImagesPartAdd } from "../PartAdd/ImagesPartAdd";
import { ImagesPartView } from "../PartsView/ImagesPartView";

import imageURL from "../../utils/ImageURL";

type ImagesPartProps = {
  constatationId: string;
};

export function ImagesPart({ constatationId = null }:ImagesPartProps) {
  const [activeIndex, setActiveIndex] = useState({
    activeIndex:0
  });

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

      <ScrollView>
      <Text>{ImagesWithMedia?.length ?? '0'} photo(s)</Text>
      <View>
        {ImagesWithMedia.map((image, index) => (
            <Tile
            imageSrc={{ uri: imageURL({image}) }}
            title={image.name}
            caption={image.text}
            key={index}
          />
        ))
        }
      </View>
      <Text>{ImagesWithoutMedia?.length ?? '0'} photo(s)</Text>
      {ImagesWithoutMedia.map((image, index) => (
        <ImagesPartView imageId={image?.id?.toString()} key={index}/>
      ))}
      
      
    </ScrollView>
    </View>
    
  );
}
