import React from "react";

import { Constatation } from "../../types";
import { useNavigation } from "@react-navigation/native";

import {
  Card,
  Image,
  Button,
  Icon,
  Divider,
  Text,
} from "react-native-elements";

import thumbURL from "../../utils/ThumbURL";
import { View } from "react-native";

type constatationCardProps = {
  constatation: Constatation;
};

export function ConstatationCard({ constatation }: constatationCardProps) {
  const navigation = useNavigation();

  return (
    <Card>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button title="Super Edit" style={{ marginRight: 10 }} />
        <Button
          title="Edit"
          style={{ marginRight: 10 }}
          onPress={() =>
            navigation.navigate("Edition", { constatationId: constatation.id })
          }
        />
        <Button
          title="Détails"
          style={{ marginRight: 10 }}
          onPress={() =>
            navigation.navigate("Details", { constatationId: constatation.id })
          }
        />
      </View>
      <Card.Title style={{ alignSelf: "flex-start" }}>
        Constatation n°{constatation.id}
      </Card.Title>

      <Card.Divider />
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
      <Image
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
    </Card>
  );
}