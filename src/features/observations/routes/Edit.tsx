import { ImagesPart } from "@/features/observations/subfeatures/images/components/ImagesPart";
import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Card, Tab, TabView } from "@rneui/base";
import React from "react";
import { ScrollView } from "react-native";
import { ObservationStackParamList } from "..";
import { ObservationEditCard } from "../components/Edit/ObservationEditCard";
import { useObservation } from "../hooks/useObservation";
import { FieldGroupsPart } from "../subfeatures/fieldgroups/components/FieldGroupsPart";

interface ObservationEditProps {
  navigation: StackNavigationProp<ObservationStackParamList, "Edition">;
  route: RouteProp<ObservationStackParamList, "Edition">;
}

export default function Edit(props: ObservationEditProps) {
  const observationId = props.route.params.observationId;

  const observationQuery = useObservation({
    observationId: observationId,
  });
  const observation = observationQuery?.data;

  // return observation !== undefined ? <ObservationEditCard observation={observation} /> : <Card>Error</Card>;
  const [index, setIndex] = React.useState<number>(0);
  return observation !== undefined ? (
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
        <Tab.Item title="Images" titleStyle={{ fontSize: 12 }} icon={<Fontisto name="photograph" size={16} color="white" />} />
        <Tab.Item title="Questionnaires" titleStyle={{ fontSize: 12 }} icon={<MaterialCommunityIcons name="file-document-multiple-outline" size={16} color="white" />} />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ width: "100%" }}>
          <ScrollView>
            <ObservationEditCard observation={observation} />
          </ScrollView>
        </TabView.Item>
        <TabView.Item style={{ width: "100%" }}>
          <ScrollView>
            <ImagesPart observation={observation} />
          </ScrollView>
        </TabView.Item>
        <TabView.Item style={{ width: "100%" }}>
          <ScrollView>
            <FieldGroupsPart observation={observation} />
          </ScrollView>
        </TabView.Item>
      </TabView>
    </>
  ) : (
    <Card>Error</Card>
  );
}
