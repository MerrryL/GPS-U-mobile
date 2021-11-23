import React, { useState } from "react";
import { Image as ImageType } from "@/types";
import { useDefineAsThumbConstatationImage } from "../../hooks/useDefineAsThumbConstatationImage";
import { useDeletePictureConstatationImage } from "../../hooks/useDeletePictureConstatationsImage";
import { View } from "react-native";
import { useWindowDimensions } from 'react-native';
import { Chip, Tile, makeStyles, Image } from "react-native-elements";

import imageURL from "@/features/constatations/utils/ImageURL";
import LongText from "@/components/Elements/Text/LongText";

type ConstatationGalleryImageProps={
    image:ImageType;
}

export default function TabImage(props: ConstatationGalleryImageProps) {
  const { image } = props;

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const styles= useStyles({width:windowWidth, height:windowHeight});


  const useDefineAsThumbMutation = useDefineAsThumbConstatationImage({
    imageId: image.id as string,
    constatationId: image.constatation_id
  });
  const useDeletePictureMutation = useDeletePictureConstatationImage({
    imageId: image.id as string,
    constatationId: image.constatation_id
  });

  type DefineAsThumbProps = {
    image: ImageType

  };

  const defineAsThumb = async ({image: image}:DefineAsThumbProps) => {
    await useDefineAsThumbMutation.mutateAsync({
        imageId: image.id as string,
        constatationId: image.constatation_id
      });
  };

  type DeletePictureProps = {
    image:ImageType;
  };

  const deletePicture = async ({image:image}:DeletePictureProps) => {
    await useDeletePictureMutation.mutateAsync({
        imageId: image.id as string,
        constatationId: image.constatation_id
      });
  };

  return (
    <View style={styles.container}>
      <LongText containerStyle={{margin:"20px"}} boldText={image.name} text={image.description} />
      <Image style={styles.image} resizeMode="cover" source={imageURL({ image: image.media[0] })} />
      <View style={styles.buttonContainer}>
        <Chip
          title="Définir comme image par défaut"
          onPress={() => defineAsThumb({ image: image })}
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
          onPress={() => deletePicture({ image: image })}
          icon={{
            name: "close",
            type: "font-awesome",
            size: 20,
            color: "white",
          }}
          iconRight
        />
      </View>
    </View>
  );
}


const useStyles = makeStyles((theme, props) => ({
  container: {
    minHeight:150,
  },
  buttonContainer:{
    flexDirection: "row", 
    justifyContent: "flex-end"
  },
  image:{
    alignSelf: "center",
    margin: "auto",

    width: props.width*0.8,
    height: props.width*0.8,
  }
}));
