import React from "react";

import { ThemeProvider, Text } from "react-native-elements";

import ConstatationCard from "../../components/molecules/constatationCard";

export default function ConstatationList({ constatationList, navigation }) {
  //   console.log("in list");
  //   console.log(constatationList);

  if (constatationList.data.length > 0) {
    return constatationList.data.map((constatation, index) => {
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
