import { useObservations } from "@/hooks/useObservations";
import { useObservers } from "@/hooks/useObservers";
import { Observation, User } from "@/types";
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
