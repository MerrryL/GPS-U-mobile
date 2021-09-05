import React, { useState } from "react";

import { Button, Text, Input } from "react-native-elements";

import { ScrollView, View } from "react-native";
import { Card } from "react-native-elements";

//import { FieldGroup } from "../components/Edit/FieldGroup";
import { CardHeader } from "../components/Edit/CardHeader";
import { ImagesPart } from "../subfeatures/images/components/ImagesPart";
import { LocalizationPart } from "../subfeatures/location/components/LocalizationPart";
import { FieldGroupPart } from "../subfeatures/fieldgroups/components/FieldGroupsPart";

import Accordion from 'react-native-collapsible/Accordion';

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
  const [activeSections, setActiveSections] = useState([0]);

  const sections= [
    {
      position: 0,
      title: 'Corps',
      content: <CardHeader constatationId={route.params.constatationId} />
    },
    {
      position: 1,
      title: 'Images',
      content: <ImagesPart constatationId={route.params.constatationId} />
    },
    {
      position: 2,
      title: 'Localisation',
      content: <LocalizationPart constatationId={route.params.constatationId} />
    },
    {
      position: 3,
      title: 'Champs',
      content: <FieldGroupPart constatationId={route.params.constatationId} />
    },
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
        <Card.Title h1>Constatation n°{route.params.constatationId}</Card.Title>
        <Card.Divider/>

        <Accordion
          activeSections={activeSections}
          sections={sections}
          renderSectionTitle={_renderSectionTitle}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={_updateSections}
        />
        
        {/* Actions, dossier, constatateurs */}
        {/* Suivis */}


      </Card>
    </ScrollView>
  );
}
