import NormalText from "@/components/Elements/Text/NormalText";
import ConstatationCover from "@/features/constatations/components/elements/ConstatationCover";
import TabOfImages from "@/features/constatations/subfeatures/images/components/elements/TabOfImages";
import { Image, Media } from "@/types";
import { Colors, makeStyles, Theme } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import AddAnotherImage from "./elements/AddAnotherImage";
import TabOfRemainingImages from "./elements/TabOfRemainingImages";

type ImagesPartProps = {
  cover: Media;
  images: Image[];
  constatationId: number;
};

export default function ImagesPart(props: ImagesPartProps) {
  const { cover, images, constatationId } = props;
  const styles = useStyles();

  const ImagesWithMedia: Image[] = [];
  const ImagesWithoutMedia: Image[] = [];

  images.map((image) => {
    if (image?.media?.length > 0) {
      ImagesWithMedia.push(image);
    } else {
      ImagesWithoutMedia.push(image);
    }
  });

  return (
    <View>
      <NormalText boldText="Photo de couverture actuelle" />
      <ConstatationCover cover={cover} images={images} style={styles.cover} />

      {ImagesWithMedia.length > 0 ? <TabOfImages images={ImagesWithMedia} /> : <NormalText boldText="Aucune photo n'a été prise pour l'instant" text="N'hésitez pas à compléter les demandes de photographies spécifiques aux observations ou à rajouter d'autres photographies" />}

      {ImagesWithoutMedia.length > 0 ? <TabOfRemainingImages images={ImagesWithoutMedia} /> : <NormalText boldText="Aucune autre photo n'est requise pour l'instant" text="Mais n'hésitez pas à rajouter d'autres photographies" />}

      <AddAnotherImage constatationId={constatationId} />

      {/* <ScrollView >
        {ImagesWithoutMedia.map((image, index) => (
          <ImagesPartView constatationId={constatationId} myImage={image} key={index}/>
        ))}
      </ScrollView> */}

      <View>{/* <ImagesPartAdd constatationId={constatationId}/> */}</View>
    </View>
  );
}

const useStyles = makeStyles((theme:{ colors: Colors; } & Theme, props: StyleProps) => ({
  container: {
    alignItems: "baseline",
    ...props.container,
  },
  boldText: {
    fontSize: "16px",
    fontWeight: "bold",
    color: theme?.colors?.grey3,
    ...props.boldText,
  },
  text: {
    ...props.text,
  },

  cover: {
    width: 150,
    height: 150,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "black",
  },
});
