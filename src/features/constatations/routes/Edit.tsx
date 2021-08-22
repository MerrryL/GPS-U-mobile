import React from "react";

import { Button, Text, Input } from "react-native-elements";

import { FlatList, View } from "react-native";
import { Card } from "react-native-elements";

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
  return (
    <Card>
      {/* <CardHeader constatationId={route.params.constatationId} /> */}
      <Card.Divider />
      <ImagesPart constatationId={route.params.constatationId} />
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
