import React from "react";

import { Constatation, Image } from "../types";
import { useNavigation } from "@react-navigation/native";

import { Card, Button, Icon, ThemeProvider, Text } from "react-native-elements";

import thumbURL from "../utils/ThumbURL";

type constatationCardProps = {
  constatation: Constatation;
};

export function ConstatationCard({ constatation }: constatationCardProps) {
  const navigation = useNavigation();

  return (
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
        source={{ uri: thumbURL({ image: constatation?.images[0] }) }}
        resizeMode="cover"
        style={{
          width: 150,
          height: 150,
          borderRadius: 20,
          overflow: "hidden",
          borderWidth: 3,
          borderColor: "black",
        }}
      />
      <Text style={{ marginBottom: 10 }}>
        +{constatation?.images.length - 1} photo(s)
      </Text>
      <Text style={{ marginBottom: 10 }}>{constatation.comment}</Text>
      <Text style={{ marginBottom: 10 }}>Par: {constatation.comment}</Text>
      <Text style={{ marginBottom: 10 }}>Champs:{constatation.comment}</Text>

      <Button
        icon={<Icon name="code" color="#ffffff" />}
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        title=" Voir en détail"
        onPress={() =>
          navigation.navigate("Details", { constatationId: constatation.id })
        }
      />
    </Card>
  );
}
