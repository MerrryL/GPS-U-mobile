import { Constatation } from "@/types";
import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Card, Tab, TabView } from "@rneui/base";
import React from "react";
import { GestureResponderEvent, ScrollView } from "react-native";
import { ConstatationStackParamList } from "..";
import { ConstatationEditCard } from "../components/Edit/ConstatationEditCard";
import { useConstatation } from "../hooks/useConstatation";
import { FieldPart } from "../subfeatures/fields/components/FieldPart";
import ImagesPart from "../subfeatures/images/components/ImagesPart";
import LocalizationPart from "../subfeatures/localization/components/LocalizationPart";

interface ConstatationEditProps {
  navigation: StackNavigationProp<ConstatationStackParamList, "Edition">;
  route: RouteProp<ConstatationStackParamList, "Edition">;
}

export default function Edit(props: ConstatationEditProps): JSX.Element {
  const constatationId: number = props.route.params.constatationId;

  const constatation: Constatation | undefined = useConstatation({
    constatationId: constatationId,
  })?.data;

  const [index, setIndex] = React.useState<number>(0);
  return constatation !== undefined ? (
    <>
      <Tab
        value={index}
        onChange={(e: number) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: "white",
          height: 2,
        }}
        variant="primary"
      >
        <Tab.Item title="Administratif" titleStyle={{ fontSize: 12 }} icon={<MaterialCommunityIcons name="folder-information-outline" size={16} color="white" />} />
        <Tab.Item title="Localisation" titleStyle={{ fontSize: 12 }} icon={<MaterialCommunityIcons name="map-marker-radius-outline" size={16} color="white" />} />
        <Tab.Item title="Images" titleStyle={{ fontSize: 12 }} icon={<Fontisto name="photograph" size={16} color="white" />} />
        <Tab.Item title="Questionnaires" titleStyle={{ fontSize: 12 }} icon={<MaterialCommunityIcons name="file-document-multiple-outline" size={16} color="white" />} />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring" disableSwipe={index ===1}>
        <TabView.Item style={{ width: "100%" }}>
          <ScrollView>
            <ConstatationEditCard constatation={constatation} />
          </ScrollView>
        </TabView.Item>
        <TabView.Item style={{ width: "100%" }}>
          <ScrollView onStartShouldSetResponder={(event: GestureResponderEvent) => true}>
            <LocalizationPart constatation={constatation} />
          </ScrollView>
        </TabView.Item>
        <TabView.Item style={{ width: "100%" }}>
          <ScrollView>
            <ImagesPart constatation={constatation} />
          </ScrollView>
        </TabView.Item>
        <TabView.Item style={{ width: "100%" }}>
          <ScrollView>
            <FieldPart constatation={constatation} />
          </ScrollView>
        </TabView.Item>
      </TabView>
    </>
  ) : (
    <Card>Error</Card>
  );
}
