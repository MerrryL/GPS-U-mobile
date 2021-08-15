import React from "react";

import { ThemeProvider, Text } from "react-native-elements";

import ConstatationCard from "./constatationCard";

export default function ConstatationList({ constatationList, navigation }) {
  //   console.log("in list");
  console.log(constatationList);

  if (constatationList?.length > 0) {
    return constatationList.map((constatation, index) => {
      return (
        <ConstatationCard
          constatation={constatation}
          key={index}
          navigation={navigation}
        />
      );
    });
  } else {
    return (
      <ThemeProvider>
        <Text h2>Nothing to show</Text>
      </ThemeProvider>
    );
  }
}
