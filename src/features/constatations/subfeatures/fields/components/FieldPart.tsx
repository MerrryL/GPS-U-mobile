import React, { useState } from "react";
import { FAB, Text, Button, Input } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//import { Field } from "../types";

import { useFields } from "../hooks/useFields";
import { FieldCard } from "./FieldCard";
import { FieldsAdd } from "./FieldAdd";
// import { useUpdateField } from "../hooks/useUpdateField";

export function FieldPart({ field, fieldGroupId, constatationId }) {
  const FieldsQuery = useFields({
    constatationId: constatationId
  });
  

  console.log("FieldsData",FieldsQuery?.data);

  return (
    <>
      <FieldsAdd constatationId={constatationId} fieldGroupId={fieldGroupId}/>
      { FieldsQuery?.data?.map( (field) => <FieldCard field={field} constatationId={constatationId} key={field.id}/>)}
    </>
  )
}
