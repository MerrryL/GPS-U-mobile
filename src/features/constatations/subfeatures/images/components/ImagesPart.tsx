import NormalText from "@/components/Elements/Text/NormalText";
import ConstatationCover from "@/features/constatations/components/elements/ConstatationCover";
import TabOfImages from "@/features/constatations/subfeatures/images/components/elements/TabOfImages";
import { Constatation, Image } from "@/types";
import { Card, Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import AddAnotherImage from "./elements/AddAnotherImage";
import TabOfRemainingImages from "./elements/TabOfRemainingImages";

interface ImagesPartProps {
  constatation: Constatation;
}

interface StyleProps {
  container: StyleProp<ViewStyle>;
}

export default function ImagesPart({ constatation }: ImagesPartProps): JSX.Element {
  const styles: StyleProps = useStyles();

  const ImagesWithMedia: Image[] = constatation.images.filter((image: Image) => image.media.length > 0);
  const ImagesWithoutMedia: Image[] = constatation.images.filter((image: Image) => image.media.length === 0);

  return (
    <Card containerStyle={styles.container}>
      <Card>
        <NormalText boldText="Photo de couverture actuelle" />
        <Card.Divider></Card.Divider>
        <ConstatationCover cover={constatation.media[0]} images={constatation.images} />
      </Card>
      <Card>
        <NormalText boldText="Photos requises selon les observations" />
        <Card.Divider></Card.Divider>
        {ImagesWithoutMedia.length > 0 ? <TabOfRemainingImages images={ImagesWithoutMedia} /> : <NormalText boldText="Aucune autre photo n'est requise pour l'instant" text="Mais n'hésitez pas à rajouter d'autres photographies" />}
      </Card>
      <Card>
        <NormalText boldText="Gallerie" />
        <Card.Divider></Card.Divider>
        <AddAnotherImage constatation={constatation} />
        {ImagesWithMedia.length > 0 ? <TabOfImages images={ImagesWithMedia} /> : <NormalText boldText="Aucune photo n'a été prise pour l'instant" text="N'hésitez pas à compléter les demandes de photographies spécifiques aux observations ou à rajouter d'autres photographies" />}
      </Card>
    </Card>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
    backgroundColor: theme?.colors?.grey5,
    alignContent: "stretch",
  },
  boldText: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.grey3,
  },
  cover: {
    width: 150,
    height: 150,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "black",
  },
}));
