import React from "react";

import { Button, Text, Input } from "react-native-elements";

import { ActionSheetIOS, FlatList, ScrollView, View } from "react-native";
import { Card } from "react-native-elements";

//import { FieldGroup } from "../components/Edit/FieldGroup";
import { CardHeader } from "../components/Edit/CardHeader";
import { ImagesPart } from "../subfeatures/images/components/ImagesPart";
import { LocalizationPart } from "../subfeatures/location/components/LocalizationPart";
import { FieldGroupPart } from "../subfeatures/fieldgroups/components/FieldGroupsPart";

type Params = {
  constatationId: string;
};

type EditProps = {
  route: Route;
};

type Route = {
  params: Params;
};

export default function Edit({ route }: EditProps) {
  return (
    <ScrollView>
      <Card>
        <CardHeader constatationId={route.params.constatationId} />
        <Card.Divider />
        {/* Actions, dossier, constatateurs */}
        {/* <ImagesPart constatationId={route.params.constatationId} /> */}
        <Card.Divider />
        {/* <LocalizationPart constatationId={route.params.constatationId} /> */}
        <Card.Divider />
        {/* <FieldGroupPart constatationId={route.params.constatationId} /> */}
        <Card.Divider />
        {/* Suivis */}
      </Card>
    </ScrollView>
  );
}
