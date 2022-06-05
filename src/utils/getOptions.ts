import { useCodexes } from "@/features/observations/hooks/useCodexes";
import { useObservationTypes } from "@/features/observations/hooks/useObservationTypes";
import { useFieldTypes } from "@/hooks/useFieldTypes";
import { useObservations } from "@/hooks/useObservations";
import { useObservers } from "@/hooks/useObservers";
import { Codex, FieldType, Observation, ObservationType, User } from "@/types";
import { PickerItem } from "@/types/utilityTypes";
import { UseQueryResult } from "react-query";

export function getObserversOptions():PickerItem[] | undefined {
  const allObserversQuery: UseQueryResult<User[], unknown> = useObservers();
  return allObserversQuery?.data?.map((observer: User):PickerItem => ({
    item: observer?.lastName?.toUpperCase() + " " + observer?.firstName,
    id: observer.id,
  }));
}

export function getObservationsOptions(): PickerItem[] | undefined {
  const allObservationsQuery: UseQueryResult<Observation[], unknown> = useObservations();
  return allObservationsQuery?.data?.map(
    (observation: Observation): PickerItem => ({
      item: observation?.name?.toUpperCase(),
      id: observation.id,
    })
  );
}

export function getCodexesOptions(): PickerItem[]  | undefined {
  const allCodexesQuery: UseQueryResult<Codex[], unknown> = useCodexes();
  return  allCodexesQuery?.data?.map(
    (codex: Codex): PickerItem => ({
      item: codex.name?.toUpperCase(),
      id: codex.id,
    })
  );
}


export function getObservationTypesOptions(): PickerItem[]  | undefined {
  const allObservationTypesQuery: UseQueryResult<ObservationType[], unknown> = useObservationTypes();
  return  allObservationTypesQuery?.data?.map(
    (observationType: ObservationType): PickerItem => ({
      item: observationType.name?.toUpperCase(),
      id: observationType.id,
    })
  );
}

export function getFieldTypesOptions(): PickerItem[] | undefined {
  const allFieldTypesQuery: UseQueryResult<FieldType[], unknown> = useFieldTypes();
  return allFieldTypesQuery?.data?.map((fieldType:FieldType):PickerItem => ({
     item: fieldType.name, 
     id: fieldType.id
    })
  );
}