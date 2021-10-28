import React, { useState } from "react";

import { ScrollView } from "react-native";
import { Card } from "react-native-elements";
import Accordion from 'react-native-collapsible/Accordion';

import { CardHeader } from "../components/Edit/CardHeader";



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

  const sections= [
    {
      position: 0,
      title: 'Corps',
      content: <CardHeader observationId={observationId} />
    },
    // {
    //   position: 2,
    //   title: 'Champs',
    //   content: <FieldGroupPart observationId={observationId} />
    // },
    // {
    //   position: 3,
    //   title: 'Suivis',
    //   content: <FollowupPart observationId={observationId}/>
    // }
  ]
  
  const _renderSectionTitle = (section) => {
    if (activeSections.includes(section.position)){
      return;
    } else {
      return (
        <>
          <Card.Title onPress={ () => _updateSections(section.position)}>{section.title}</Card.Title>
          <Card.Divider />
        </>
      );
    }
  };

  const _renderHeader = (section) => {
    if (activeSections.includes(section.position)){
      return <Card.Title>{section.title}</Card.Title>
    } else {
      return <></>;
    }
  };

  const _renderContent = (section) => {
    return section.content;   
  };

  const _updateSections = (activeSections) => {
    setActiveSections([activeSections ] );
  };

  return (
    <ScrollView>
      <Card>
        <Card.Title h1>Observation n°{observationId}</Card.Title>
        <Card.Divider/>

        <Accordion
          activeSections={activeSections}
          sections={sections}
          renderSectionTitle={_renderSectionTitle}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={_updateSections}
        />
        
        {/* Actions, dossier */}
        {/* Suivis */}


      </Card>
    </ScrollView>
  );
}
