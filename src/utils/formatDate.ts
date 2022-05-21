import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

export default function formatDate(date: string): string {
  return format(parseISO(date), "PPPPpp", { locale: fr });
}
