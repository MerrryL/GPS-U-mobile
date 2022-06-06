import MultiPickerInput from "@/components/Elements/Inputs/MultiPickerInput";
import { Button, Card } from "@rneui/base";
import { xorBy } from "lodash";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useConstatationObservations } from "../hooks/useConstatationObservations";
import { useObservations } from "../hooks/useObservations";
import { useUpdateConstatationObservations } from "../hooks/useUpdateConstatationObservations";

type ObservationPartProps = {
  constatationId: number;
};

type ObservationToSend = {
  id: string | number;
  item: string;
};

export function ObservationPart({ constatationId }: ObservationPartProps) {
  const updateObservationMutation = useUpdateConstatationObservations({
    constatationId: constatationId,
  });

  const allObservationsQuery = useObservations();
  const options = allObservationsQuery?.data?.map((Observation) => ({
    item: Observation?.lastName?.toUpperCase() + " " + Observation?.firstName,
    id: Observation.id,
  }));

  const initialObservationsQuery = useConstatationObservations({
    constatationId,
  });
  const initialObservations = initialObservationsQuery?.data?.map((Observation) => ({
    item: Observation?.lastName?.toUpperCase() + " " + Observation?.firstName,
    id: Observation.id,
  }));

  const [selectedObservations, setSelectedObservations] = useState(initialObservations);
  const [obsOptions, setOptions] = useState(options);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const onSubmit = async () => {
    const selectedObservationsId = selectedObservations.map((item: ObservationToSend) => item.id);

    await updateObservationMutation.mutateAsync({
      constatationId: constatationId,
      Observations: selectedObservationsId,
    });
  };

  return (
    <>
      <Card>
        <MultiPickerInput name="Observations" label="Observations" options={obsOptions} selectedValues={selectedObservations} control={control} />
      </Card>
      <Button title="MAJ" onPress={() => onSubmit()} />
    </>
  );

  function onMultiChange() {
    return (item) => setSelectedObservations(xorBy(selectedObservations, [item], "id"));
  }
}
