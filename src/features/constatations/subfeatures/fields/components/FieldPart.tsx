import React, { useState } from "react";
import { FAB, Text, Button, Input } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//import { Field } from "../types";

import { useFields } from "../hooks/useFields";
import { FieldCard } from "./FieldCard";
import { FieldsAdd } from "./FieldAdd";
import { useDeleteField } from "../hooks/useDeleteField";
// import { useUpdateField } from "../hooks/useUpdateField";

export function FieldPart({ field, fieldGroupId, constatationId }) {
  const FieldsQuery = useFields({
    fieldGroupId: fieldGroupId
  });

  return (
    <>
      { FieldsQuery?.data?.map( (field) => <FieldCard field={field} fieldGroupId={fieldGroupId} constatationId={constatationId} key={field.id}/>)}
    </>
  )
}
