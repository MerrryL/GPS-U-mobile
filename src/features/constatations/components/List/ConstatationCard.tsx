import React from "react";

import { Constatation } from "@/types";
import { useNavigation } from "@react-navigation/native";

import {
  Card,
  Image,
  Button,
  Icon,
  Divider,
  Text,
} from "react-native-elements";

import { View } from "react-native";
import imageURL from "../../utils/ImageURL";

type constatationCardProps = {
  constatation: Constatation;
};

export function ConstatationCard({ constatation }: constatationCardProps) {
  const navigation = useNavigation();

  //console.log(constatation);
  return (
    <Card>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button
          title="Edit"
          style={{ marginRight: 10 }}
          onPress={() =>
            navigation.navigate("Edition", { constatationId: constatation?.id })
          }
        />
        <Button
          title="Détails"
          style={{ marginRight: 10 }}
          onPress={() =>
            navigation.navigate("Details", { constatationId: constatation?.id })
          }
        />
      </View>
      <Card.Title style={{ alignSelf: "flex-start" }}>
        Constatation n°{constatation?.id}
      </Card.Title>

      <Card.Divider />
      <Card.FeaturedTitle>
        Addresse:{constatation?.localization?.address?.formatted_address}
      </Card.FeaturedTitle>
      <Card.FeaturedSubtitle>
        Date: {constatation?.created_at}
      </Card.FeaturedSubtitle>
      <Text style={{ marginBottom: 10 }}>
        Validation:{constatation?.isValidated}
      </Text>
      <Card.Divider />
      <Image
        source={imageURL({ image: constatation }) }
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
        {constatation?.images.length > 1 ? constatation?.images?.length +" photos" : constatation?.images?.length > 0 ? "Une photo" : "Pas de photo"}
      </Text>
      <Text style={{ marginBottom: 10 }}>Description: {constatation?.description}</Text>
      <Text style={{ marginBottom: 10 }}>Par: {constatation?.comment}</Text>
      <Text style={{ marginBottom: 10 }}>Champs:{constatation?.comment}</Text>
    </Card>
  );
}
