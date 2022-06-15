import MultiPickerInput from "@/components/Elements/Inputs/MultiPickerInput";
import { Button, Card } from "@rneui/base";
import { xorBy } from "lodash";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { useObservers } from "../../../../../hooks/useObservers";
import { useConstatationObservers } from "../hooks/useConstatationObservers";
import { useUpdateConstatationObservers } from "../hooks/useUpdateConstatationObservers";

type ObserverPartProps = {
  constatationId: number;
};

type ObserverToSend = {
  id: number;
  item: string;
};

export function ObserverPart({ constatationId }: ObserverPartProps) {
  const updateObserverMutation = useUpdateConstatationObservers({
    constatationId: constatationId,
  });

  const allObserversQuery = useObservers();
  const options = allObserversQuery?.data?.map((observer) => ({
    item: observer?.lastName?.toUpperCase() + " " + observer?.firstName,
    id: observer.id,
  }));

  const initialObserversQuery = useConstatationObservers({ constatationId });
  const initialObservers = initialObserversQuery?.data?.map((observer) => ({
    item: observer?.lastName?.toUpperCase() + " " + observer?.firstName,
    id: observer.id,
  }));

  const [selectedObservers, setSelectedObservers] = useState(initialObservers);
  const [obsOptions, setOptions] = useState(options);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const onSubmit = async () => {
    const selectedObserversId = selectedObservers.map((item: ObserverToSend) => item.id);

    await updateObserverMutation.mutateAsync({
      constatationId: constatationId,
      observers: selectedObserversId,
    });
  };

  return (
    <View style={{ margin: 10 }}>
      <Card>
        <MultiPickerInput name="observers" label="observers" options={obsOptions} selectedValues={selectedObservers} control={control} />
      </Card>
      <Button title="MAJ" onPress={() => onSubmit()} />
    </View>
  );

  function onMultiChange() {
    return (item) => setSelectedObservers(xorBy(selectedObservers, [item], "id"));
  }
}
