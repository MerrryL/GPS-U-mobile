import React from "react";

import { Button, Text, Input } from "react-native-elements";

import { FlatList, View } from "react-native";
import { Card } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useConstatation } from "../hooks/useConstatation";

//import { FieldGroup } from "../components/Edit/FieldGroup";
import { CardHeader } from "../components/Edit/CardHeader";
import { LocationPart } from "../components/Edit/LocationPart";
import { ImagesPart } from "../components/Edit/ImagesPart";

type Params = {
  constatationId: string;
};

type EditProps = {
  route: Route;
};

type Route = {
  params: Params;
};

export function Edit({ route }: EditProps) {
  const constatationQuery = useConstatation({
    constatationId: route.params.constatationId,
  });


  console.log("constat", constatationQuery?.data);
  
  return (
    <Card>
      {/* <CardHeader constatation={constatationQuery?.data} /> */}
      <Card.Divider />
      <ImagesPart images={constatationQuery?.data?.images} constatationId={route.params.constatationId}/>
      <Card.Divider />
      <LocationPart constatationId={route.params.constatationId} />

      {/* <FlatList
        data={constatationQuery?.data?.field_groups}
        renderItem={(field_group) => <FieldGroup field_group={field_group} />}
        keyExtractor={(field_group) => field_group?.id.toString()}
      /> */}
    </Card>
  );
}
