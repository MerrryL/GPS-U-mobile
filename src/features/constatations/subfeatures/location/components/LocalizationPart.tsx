import React, { useState } from "react";
import { FAB, Text, Button, Input } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//import { Localization } from "../types";

import { useLocalization } from "../hooks/useLocalization";
import { useUpdateLocalization } from "../hooks/useUpdateLocalization";
import { LocalizationForm } from "./LocalizationForm";

export function LocalizationPart({ constatationId = null }) {
  const LocalizationQuery = useLocalization({
    constatationId: constatationId
  });
  

  console.log(LocalizationQuery?.data);

  return (
    <>
      <LocalizationForm localization={LocalizationQuery?.data} constatationId={constatationId}/>
    </>
  )
}
