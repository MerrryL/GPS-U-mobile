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
import { ObserverPart } from "../subfeatures/observers/components/ObserverPart";
import { useConstatation } from "../hooks/useConstatation";
import { useObservers } from "../subfeatures/observers/hooks/useObservers";
import { FollowupPart } from "../../followups/components/FollowupPart";

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
  const constatationId = route.params.constatationId;
  const [activeSections, setActiveSections] = useState([0]);

  const allObserversQuery= useObservers();
  const options = allObserversQuery?.data?.map( observer => ({item: observer?.lastName?.toUpperCase() + " " + observer?.firstName, id: observer.id}));
  const observersQuery = useConstatation({constatationId});
  const initialObservers = observersQuery?.data?.observers?.map( observer => ({item: observer?.lastName?.toUpperCase() + " " + observer?.firstName, id: observer.id}));


  const sections= [
    {
      position: 0,
      title: 'Corps',
      content: <CardHeader constatationId={constatationId} />
    },
    {
      position: 1,
      title: 'Images',
      content: <ImagesPart constatationId={constatationId} />
    },
    {
      position: 2,
      title: 'Localisation',
      content: <LocalizationPart constatationId={constatationId} />
    },
    {
      position: 3,
      title: 'Champs',
      content: <FieldGroupPart constatationId={constatationId} />
    },
    {
      position: 4,
      title: 'Agents constatants',
      content: <ObserverPart constatationId={constatationId} initialObservers={initialObservers} options={options}/>
    },
    // {
    //   position: 5,
    //   title: 'Observations',
    //   content: <ObservationPart constatationId={constatationId} initialObservers={initialObservers} options={options}/>
    // },
    // {
    //   position: 6,
    //   title: 'Suivis',
    //   content: <FollowupPart constatationId={constatationId}/>
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
        <Card.Title h1>Constatation n°{constatationId}</Card.Title>
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
