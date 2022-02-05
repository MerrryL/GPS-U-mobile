import NormalText from "@/components/Elements/Text/NormalText";
import { Image as ImageType } from "@/types";
import React, { useState } from "react";
import { View } from "react-native";
import { makeStyles, Tab, TabView, Text } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import TabRemainingImage from "./TabRemainingImage";

type ImagesTabsProps = {
  images: ImageType[];
};

export default function TabOfRemainingImages(props: ImagesTabsProps) {
  const { images } = props;
  const [index, setIndex] = useState(0);

  const [isVisible, setVisibility] = useState(true);

  const boldText =
    images?.length === 1
      ? "Une photo est requise"
      : images?.length + " photo(s) sont requises";
  const text = "Pour compléter les observations";

  const styles = useStyles();

  return (
    <View style={styles.container}>
      <NormalText boldText={boldText} text={text} />

      <TouchableOpacity onPress={() => setVisibility(!isVisible)}>
        <Text
          style={{ alignSelf: "flex-end", fontStyle: "italic", color: "blue" }}
        >
          {isVisible
            ? "Cacher les photos requises"
            : "Prendre les photos requises"}
        </Text>
      </TouchableOpacity>
      {isVisible && (
        <>
          <Tab
            value={index}
            onChange={setIndex}
            indicatorStyle={styles.indicatorStyle}
          >
            {images &&
              images.map((image, key) => (
                <Tab.Item
                  key={key}
                  title={image.name}
                  titleStyle={styles.tabItem}
                />
              ))}
          </Tab>

          <TabView value={index} onChange={setIndex}>
            {images &&
              images.map((image, key) => (
                <TabView.Item key={key}>
                  <TabRemainingImage myImage={image} />
                </TabView.Item>
              ))}
          </TabView>
        </>
      )}
    </View>
  );
}

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
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
