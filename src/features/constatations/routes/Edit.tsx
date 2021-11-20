import React, { useState } from "react";

import { ScrollView } from "react-native";
import { Card } from "react-native-elements";

//import { FieldGroup } from "../components/Edit/FieldGroup";
import { ConstatationEditCard } from "../components/Edit/ConstatationEditCard";
import { ImagesPart } from "../subfeatures/images/components/ImagesPart";
import { LocalizationPart } from "../subfeatures/location/components/LocalizationPart";
import { FieldGroupPart } from "../subfeatures/fieldgroups/components/FieldGroupsPart";


import { ObserverPart } from "../subfeatures/observers/components/ObserverPart";
import { FollowupPart } from "../../followups/components/FollowupPart";
import { ObservationPart } from "../subfeatures/observations/components/ObserverPart";
import { useConstatation } from "../hooks/useConstatation";


//TODO: get rid of any
type EditProps = {
  navigation: any;
  route: any;
};


export default function Edit(props: EditProps) {
  const {navigation, route} = props;
  const constatationId = route?.params?.constatationId;

  const constatation = useConstatation({
    constatationId: constatationId,
  })?.data;



  return (
    

      <ConstatationEditCard constatation={constatation} />
  );
}
