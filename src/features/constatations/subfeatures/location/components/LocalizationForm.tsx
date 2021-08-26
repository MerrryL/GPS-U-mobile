import React, { useState } from "react";
import { FAB, Text, Button, Input, Card } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//import { Localization } from "../types";
import { useUpdateLocalization } from "../hooks/useUpdateLocalization";
import { getAddressFromCoords, getCurrentLocation } from "@/lib/localization";
import { Localization } from "../types";


type LocalizationFormProps = {
  localization?: Localization,
  constatationId: string
};


const schema = yup.object().shape({
  coords: yup.object().shape(
    {
      latitude: yup.string().required(),
      longitude: yup.string().required(),
    }
  ),
  address: yup.object().shape(
    {
      formattedAddress: yup.string().required(),
    }
  )
});

export function LocalizationForm({ localization = null, constatationId }: LocalizationFormProps) {
  const LocalizationUpdateMutation = useUpdateLocalization({constatationId});

  //Todo:fix
  const {
    register, handleSubmit, setValue, getValues,
    formState: { errors },
  } = useForm<Localization>({
    defaultValues: { localization } as unknown as Localization,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    console.log("values", values);
    await LocalizationUpdateMutation.mutateAsync({
      latitude: values.coords.latitude,
      longitude: values.coords.longitude,
      formattedAddress: values.address.formattedAddress,
      constatationId: constatationId,
    });
    
    //onSuccess();
  };

  const updateLocalization = async () => {
    const localization = await getCurrentLocation();
    console.log("loc", localization);
    console.log(getValues("coords.latitude"));
    setValue("coords.latitude", "3",{
      shouldValidate: true,
      shouldDirty: true
    });
    setValue("coords.longitude", "5",{
      shouldValidate: true,
      shouldDirty: true
    });
  };

  const updateAddress = async () => {
    let newAddress= getAddressFromCoords(getValues("coords.latitude"), getValues("coords.longitude"));
    console.log(newAddress);
  }

  console.log("loca", localization);

  return (
    <Card>
      <Input
        {...register("coords.latitude")}
        placeholder="Latitude"
        defaultValue={localization?.coords?.latitude}
        numberOfLines={4}
      />
      <Text>{errors.coords?.latitude?.message}</Text>

      <Input
        {...register("coords.longitude")}
        placeholder="Longitude"
        defaultValue={localization?.coords?.longitude}
        numberOfLines={4}
      />
      <Text>{errors.coords?.longitude?.message}</Text>

      <Card.Divider/>
      <Input
        {...register("address.formatted_address")}
        placeholder="Addresse"
        defaultValue={localization?.address?.formatted_address}
        numberOfLines={4}
      />
      <Text>{errors.address?.formatted_address?.message}</Text>
      
      <Button title="MAJ adresse" onPress={handleSubmit(onSubmit)} />
      <Button title="Refresh" onPress={() => updateLocalization()} />
      <Button title="getAddress" onPress={() => updateLocalization} />

    </Card>
  );
}
