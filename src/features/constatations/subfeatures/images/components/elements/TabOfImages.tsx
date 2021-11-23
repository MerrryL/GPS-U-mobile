import ConstatationImageGalleryImage from "@/features/constatations/subfeatures/images/components/elements/TabImage";
import { Image as ImageType } from "@/types";
import React, { useState } from "react";
import { Tab, TabView, Image, makeStyles, Text } from "react-native-elements";


import { View } from "react-native";
import TabImage from "@/features/constatations/subfeatures/images/components/elements/TabImage";
import { TouchableOpacity } from "react-native-gesture-handler";




type ImagesTabsProps= {
    images: ImageType[];
}

export default function TabOfImages(props:ImagesTabsProps) {
  const { images } = props;
  const [index, setIndex] = useState(0);

  const [isVisible, setVisibility] = useState(false);


  const styles = useStyles();
  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setVisibility(!isVisible)}>
        <Text style={{alignSelf:"flex-end", fontStyle:"italic", color:"blue"}} >{isVisible ? "Cacher la galerie" : "Montrer la galerie"}</Text>
      </TouchableOpacity>
      { isVisible && (
          <>
            <Tab value={index} onChange={setIndex} indicatorStyle={styles.indicatorStyle}>
              {images && images.map( (image, key) => (
                  <Tab.Item key={key} title={image.name} titleStyle={styles.tabItem} />
              ))}
            </Tab>

            <TabView value={index} onChange={setIndex}>
              {images && images.map( (image, key) => (
                  <TabView.Item key={key}>
                      <TabImage key={index} image={image}/>
                  </TabView.Item>
              ))}
            </TabView>
          </>
        )
      }

      

    </View>
  );
}


const useStyles = makeStyles((theme) => ({
    container: {
      marginTop: "10px",

    },
    tabItem:{
      color:theme?.colors?.grey3,
      fontWeight: "bold",

    },
    indicatorStyle:{


    },
    view: {
        backgroundColor: "#aaa",
        minHeight: "300px",
    },
  }));
  