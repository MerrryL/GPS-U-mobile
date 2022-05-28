import React from "react";
import { ScrollView } from "react-native";
import { Card } from "react-native-elements";
//import { FieldGroup } from "../components/Edit/FieldGroup";
import { CardHeader } from "../components/Edit/CardHeader";




type Params = {
  constatationId: number;
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
