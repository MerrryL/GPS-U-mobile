import { Constatation } from "@/types";
import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ScrollView } from "react-native";
import { Card, Tab, TabView } from "react-native-elements";
import { ConstatationStackParamList } from "..";
import { ConstatationEditCard } from "../components/Edit/ConstatationEditCard";
import { useConstatation } from "../hooks/useConstatation";
import LocalizationPart from "../subfeatures/localization/components/LocalizationPart";

interface ConstatationEditProps {
  navigation: StackNavigationProp<ConstatationStackParamList, "Edition">;
  route: RouteProp<ConstatationStackParamList, "Edition">;
}

export default function Edit(props: ConstatationEditProps): JSX.Element {
  const constatationId = props.route?.params?.constatationId;

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

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ width: "100%" }}>
          <ScrollView>
            <ConstatationEditCard constatation={constatation} />
          </ScrollView>
        </TabView.Item>
        <TabView.Item style={{ width: "100%" }}>
          <ScrollView>
            <LocalizationPart constatation={constatation} />
          </ScrollView>
        </TabView.Item>
        <TabView.Item style={{ width: "100%" }}>
          <ScrollView>
            <ConstatationEditCard constatation={constatation} />
          </ScrollView>
        </TabView.Item>
        <TabView.Item style={{ width: "100%" }}>
          <ScrollView>
            <ConstatationEditCard constatation={constatation} />
          </ScrollView>
        </TabView.Item>
      </TabView>
    </>
  ) : (
    <Card>Error</Card>
  );
}
