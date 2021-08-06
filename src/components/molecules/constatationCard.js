import React from "react";

import { Card, Button, Icon, ThemeProvider, Text } from "react-native-elements";

export default function ConstatationCard({ constatation, navigation }) {
  //console.log("in card");
  //console.log(constatation);

  return (
    <ThemeProvider>
      <Card>
        <Card.Title>Constatation n°{constatation.id}</Card.Title>
        <Card.Divider />
        <Card.Image
          source="https://picsum.photos/200/300"
          resizeMode="cover"
          style={{ width: 200, height: 200 }}
        />
        <Text style={{ marginBottom: 10 }}>{constatation.comment}</Text>
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
