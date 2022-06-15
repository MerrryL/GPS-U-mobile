import NormalText from "@/components/Elements/Text/NormalText";
import { Image as ImageType } from "@/types";
import { Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React, { useState } from "react";
import { View } from "react-native";
import TabRemainingImage from "./TabRemainingImage";

interface ImagesTabsProps {
  images: ImageType[];
}

export default function TabOfRemainingImages(props: ImagesTabsProps): JSX.Element {
  const { images } = props;
  const [index, setIndex] = useState(0);

  const boldText = images?.length === 1 ? "Une photo supplémentaire est requise" : images?.length + " photos supplémentaires sont requises";
  const text = "Pour compléter la constatation";

  const styles = useStyles();

  return (
    <View style={styles.container}>
      <NormalText boldText={boldText} text={text} />
      {/* <Tab value={index} onChange={setIndex} indicatorStyle={styles.indicatorStyle}> */}
      {/* {images && images.map((image, key) => <Tab.Item key={key} title={image.image_request?.name ?? "Autre"} titleStyle={styles.tabItem} />)} */}
      {/* </Tab> */}

      {/* <TabView value={index} onChange={setIndex}> */}
      {images &&
        images.map((image, key) => (
          // <TabView.Item key={key}>
          <TabRemainingImage myImage={image} key={key} />
          // </TabView.Item>
        ))}
      {/* </TabView> */}
    </View>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
    marginTop: "10px",
  },
  tabItem: {
    color: theme?.colors?.grey3,
    fontWeight: "bold",
  },
  indicatorStyle: {},
  view: {
    backgroundColor: "#aaa",
    minHeight: "300px",
  },
}));
