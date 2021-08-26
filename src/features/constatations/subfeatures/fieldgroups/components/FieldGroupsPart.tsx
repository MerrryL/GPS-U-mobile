import React, { useState } from "react";
import { FAB, Text, Button, Input } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//import { FieldGroup } from "../types";

import { useFieldGroups } from "../hooks/useFieldGroups";
import { FieldGroupCard } from "./FieldGroupCard";
import { FieldGroupsAdd } from "./FieldGroupAdd";
// import { useUpdateFieldGroup } from "../hooks/useUpdateFieldGroup";

export function FieldGroupPart({ constatationId = null }) {
  const FieldGroupsQuery = useFieldGroups({
    constatationId: constatationId
  });
  

  console.log("fieldGroups",FieldGroupsQuery?.data);

  return (
    <>
      <FieldGroupsAdd constatationId={constatationId}/>
      { FieldGroupsQuery?.data?.map( (fieldGroup) => <FieldGroupCard fieldGroup={fieldGroup} constatationId={constatationId} key={fieldGroup.id}/>)}
    </>
  )
}
