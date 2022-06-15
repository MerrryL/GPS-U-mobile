import TabImage from "@/features/constatations/subfeatures/images/components/elements/TabImage";
import { Image as ImageType } from "@/types";
import { Colors, Tab, TabView, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React, { useState } from "react";
import { StyleProp, ViewStyle } from "react-native";

interface ImagesTabsProps {
  images: ImageType[];
}

interface StyleProps {
  container: StyleProp<ViewStyle>;
  tabView: StyleProp<ViewStyle>;
}
export default function TabOfImages({ images }: ImagesTabsProps): JSX.Element {
  const [index, setIndex] = useState<number>(0);

  const styles: StyleProps = useStyles();

  return (
    <>
      <Tab
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
      </TabView>
    </>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
    marginTop: "10px",
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
}));
