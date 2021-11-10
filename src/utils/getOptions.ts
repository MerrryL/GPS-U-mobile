import { useObservations } from "@/hooks/useObservations";
import { useObservers } from "@/hooks/useObservers";
import React, { useState, useEffect } from "react";

export function getObserversOptions() {
  const allObserversQuery = useObservers();
  return allObserversQuery?.data?.map((observer) => ({
    item: observer?.lastName?.toUpperCase() + " " + observer?.firstName,
    id: observer.id,
  }));
}

export function getObservationsOptions() {
  const allObservationsQuery = useObservations();
  return allObservationsQuery?.data?.map((observation) => ({
    item: observation?.name?.toUpperCase(),
    id: observation.id,
  }));
}
