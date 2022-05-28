import imageURL from "@/features/constatations/utils/ImageURL";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList } from "react-native";
import { Button, Card, Icon, Text } from "react-native-elements";
import { FieldGroup } from "../components/Edit/FieldGroup";
import { useConstatation } from "../hooks/useConstatation";




type Params = {
  constatationId: number;
};

type DetailsProps = {
  route: Route;
};

type Route = {
  params: Params;
};

export default function Details({ route }: DetailsProps) {
  const constatationQuery = useConstatation({
    constatationId: route.params.constatationId,
  });

  const navigation = useNavigation();

  return (
    <Card>
      <Button
        icon={<Icon name="code" color="#ffffff" />}
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        title=" Menu d'édition"
        onPress={() =>
          navigation.navigate("Edition", {
            constatationId: constatationQuery?.data?.id,
          })
        }
      />
      <Card.Title>Constatation n°{constatationQuery?.data?.id}</Card.Title>
      <Card.Divider />
      <Card.Image source={imageURL({ image: constatationQuery?.data })} resizeMode="cover" style={{ width: 200, height: 200 }} />
      <Text style={{ marginBottom: 10 }}>{constatationQuery?.data?.comment}</Text>

      <Card.Divider />
      <Text style={{ marginBottom: 10 }}>{constatationQuery?.data?.isValidated}</Text>
      <Text style={{ marginBottom: 10 }}>{constatationQuery?.data?.validationDate}</Text>
      <Text style={{ marginBottom: 10 }}>{constatationQuery?.data?.requiresValidation}</Text>
      <Text style={{ marginBottom: 10 }}>{constatationQuery?.data?.requiresValidationDate}</Text>
      <Text style={{ marginBottom: 10 }}>{constatationQuery?.data?.created_at}</Text>
      <Text style={{ marginBottom: 10 }}>{constatationQuery?.data?.updated_at}</Text>

      <Card.Divider />

      <FlatList data={constatationQuery?.data?.field_groups} renderItem={(field_group) => <FieldGroup field_group={field_group} />} keyExtractor={(field_group) => field_group.id.toString()} />
    </Card>
  );
}
