import { FloatingButtonStack } from "@/components/Elements/Buttons/ButtonStack";
import DeleteButton from "@/components/Elements/Buttons/DeleteButton";
import StarButton from "@/components/Elements/Buttons/StarButton";
import NormalText from "@/components/Elements/Text/NormalText";
import imageURL from "@/features/constatations/utils/ImageURL";
import { Image as ImageType } from "@/types";
import { Colors, ListItem, Image, Theme, Card } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React, { useState } from "react";
import { Button, ImageStyle, StyleProp, ViewStyle } from "react-native";
import { useDefineAsThumbConstatationImage } from "../../hooks/useDefineAsThumbConstatationImage";
import { useDeletePictureConstatationImage } from "../../hooks/useDeletePictureConstatationsImage";

interface ImagesTabsProps {
  images: ImageType[];
}

interface StyleProps {
  container: StyleProp<ViewStyle>;
  tabView: StyleProp<ViewStyle>;
  image: StyleProp<ImageStyle>;
}
export default function TabOfImages({ images }: ImagesTabsProps): JSX.Element {
  const styles: StyleProps = useStyles();
  const useDefineAsThumbMutation = useDefineAsThumbConstatationImage();
  const useDeletePictureMutation = useDeletePictureConstatationImage();

  const defineAsThumb = async (image: ImageType) => {
    await useDefineAsThumbMutation.mutateAsync({
      imageId: image.id,
      constatationId: image.constatation_id,
    });
  };

  const deletePicture = async (image: ImageType) => {
    await useDeletePictureMutation.mutateAsync({
      imageId: image.id,
      constatationId: image.constatation_id,
    });
  };
  return (
    <>
      {images &&
        images.map(
          (image: ImageType, key): JSX.Element => (
            <Card key={key}>
              <NormalText boldText={image.image_request?.name}></NormalText>
              <Card.Divider></Card.Divider>
              <ListItem.Swipeable>
                <ListItem.Content style={styles.container}>
                  <FloatingButtonStack>
                    <StarButton callBack={() => defineAsThumb(image)} />
                    <DeleteButton callBack={() => deletePicture(image)} />
                  </FloatingButtonStack>
                  <Image style={styles.image} resizeMode="cover" source={imageURL({ image: image.media[0] })} />
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem.Swipeable>
            </Card>
          )
        )}
      {/* <Tab
        value={index}
        onChange={(e: number) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: "white",
          height: 2,
        }}
        variant="primary"
      >
        {images && images.map((image: ImageType, key): JSX.Element => <Tab.Item key={key} title={image.image_request?.name ?? "Autres"}></Tab.Item>)}
      </Tab>

      <TabView value={index} onChange={setIndex}>
        {images &&
          images.map(
            (image, key): JSX.Element => (
              <TabView.Item style={styles.tabView} key={key}>
                <TabImage key={index} image={image} />
              </TabView.Item>
            )
          )}
      </TabView> */}
    </>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    alignContent: "stretch",
    alignItems: "stretch",
  },
  tabView: {
    width: "100%",
    backgroundColor: theme.colors.greyOutline,
    height: "fit-content",
  },
  view: {
    backgroundColor: "#aaa",
    minHeight: "300px",
  },
  image: {
    aspectRatio: 1 / 1,
  },
}));
