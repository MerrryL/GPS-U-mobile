import React from "react";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

export default function formatDate(date) {
  return format(parseISO(date), "PPPPpp", { locale: fr });
}
