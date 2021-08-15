import React from "react";
import Constants from "expo-constants";

import { Card, Button, Icon, ThemeProvider, Text } from "react-native-elements";

export default function ConstatationCard({ constatation, navigation }) {
  console.log("in card");
  console.log(constatation);

  function thumbUrl() {
    const extension = constatation?.images[0]?.media[0]?.file_name.substr(
      constatation?.images[0]?.media[0].name?.length
    );

    const path =
      Constants.manifest.extra.API_URL +
      "images/" +
      constatation?.images[0]?.id +
      "/conversions/" +
      constatation?.images[0]?.media[0]?.name +
      "-thumb" +
      extension;

    return path;
  }

  return (
    <ThemeProvider>
      <Card>
        <Card.Title>Constatation n°{constatation.id}</Card.Title>
        <Card.FeaturedTitle>
          Addresse:{constatation?.localization?.address?.formatted_address}
        </Card.FeaturedTitle>
        <Card.FeaturedSubtitle>
          Date: {constatation.created_at}
        </Card.FeaturedSubtitle>
        <Text style={{ marginBottom: 10 }}>
          Validation:{constatation.isValidated}
        </Text>
        <Card.Divider />
        <Card.Image
          source={{ uri: thumbUrl() }}
          resizeMode="cover"
          style={{
            width: 150,
            height: 150,
            borderRadius: 20,
            overflow: "hidden",
            borderWidth: 3,
            borderColor: "black"
          }}
        />
        <Text style={{ marginBottom: 10 }}>{constatation.comment}</Text>
        <Text style={{ marginBottom: 10 }}>
          +{constatation?.images.length - 1} photo(s)
        </Text>
        <Text style={{ marginBottom: 10 }}>Par: {constatation.comment}</Text>
        <Text style={{ marginBottom: 10 }}>Champs:{constatation.comment}</Text>

        <Button
          icon={<Icon name="code" color="#ffffff" />}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0
          }}
          title="VIEW NOW"
          onPress={() => navigation.navigate("Details", constatation)}
        />
      </Card>
    </ThemeProvider>
  );
}
