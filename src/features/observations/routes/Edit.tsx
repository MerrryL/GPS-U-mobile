import React, { useState } from "react";

import { ScrollView } from "react-native";
import { Card } from "react-native-elements";
import Accordion from "react-native-collapsible/Accordion";

import { CardHeader } from "../components/Edit/CardHeader";
import { ImagesPart } from "../subfeatures/images/components/ImagesPart";
import { FieldGroupPart } from "../subfeatures/fieldgroups/components/FieldGroupsPart";
import { useObservation } from "../hooks/useObservation";
import { FollowupPart } from "../subfeatures/followups/components/FollowupPart";

type Params = {
  observationId: string;
};

type EditProps = {
  route: Route;
};

type Route = {
  params: Params;
};

export default function Edit({ route }: EditProps) {
  const observationId = route.params.observationId;
  const [activeSections, setActiveSections] = useState([0]);
  const observationQuery = useObservation({
    observationId: observationId,
  });
  const observation = observationQuery?.data;

  const sections = [
    {
      position: 0,
      title: "Corps",
      content: <CardHeader observationId={observationId} />,
    },
    {
      position: 1,
      title: "Images",
      content: <ImagesPart observationId={observationId} />,
    },
    {
      position: 2,
      title: "Champs",
      content: <FieldGroupPart observationId={observationId} />,
    },
    {
      position: 3,
      title: "Suivis",
      content: <FollowupPart observationId={observationId} />,
    },
  ];

  const _renderSectionTitle = (section) => {
    if (activeSections.includes(section.position)) {
      return;
    } else {
      return (
        <>
          <Card.Title onPress={() => _updateSections(section.position)}>{section.title}</Card.Title>
          <Card.Divider />
        </>
      );
    }
  };

  const _renderHeader = (section) => {
    if (activeSections.includes(section.position)) {
      return <Card.Title>{section.title}</Card.Title>;
    } else {
      return <></>;
    }
  };

  const _renderContent = (section) => {
    return section.content;
  };

  const _updateSections = (activeSections) => {
    setActiveSections([activeSections]);
  };

  return (
    <ScrollView>
      <Card>
        <Card.Title h1>
          {observation?.codex?.precode} {observation?.code}
          {observation?.codex?.name ? " du " + observation?.codex?.name : ""}
        </Card.Title>
        <Card.Divider />

        <Accordion activeSections={activeSections} sections={sections} renderSectionTitle={_renderSectionTitle} renderHeader={_renderHeader} renderContent={_renderContent} onChange={_updateSections} />

        {/* Actions, dossier */}
        {/* Suivis */}
      </Card>
    </ScrollView>
  );
}
