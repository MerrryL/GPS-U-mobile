import { axios } from "@/lib/axios";
import { Dossier } from "@/types";

//DossiersPart

// type GetDossiersOptions = {};

//TODO: this points to Index on the api instead of a "show"
export const getDossiers = (): Promise<Dossier[]> => {
  return axios.get("/dossiers");
};

type GetDossierOptions = {
  dossierId: string;
};

export const getDossier = ({ dossierId }: GetDossierOptions): Promise<Dossier> => {
  return axios.get(`/dossiers/${dossierId}`);
};

type CreateDossierOptions = {
  constatationId: string;
  name: string;
  type: string;
  isDefault: boolean;
  value: string;
};

export const createDossier = ({ constatationId, name, type, isDefault, value }: CreateDossierOptions): Promise<Dossier> => {
  return axios.post("/dossiers/", {
    name,
    type,
    isDefault,
    value,
    constatationId,
  });
};

type DeleteDossierOptions = {
  dossierId: string;
  constatationId: string;
};

export const deleteDossier = ({ dossierId }: DeleteDossierOptions) => {
  return axios.delete(`dossiers/${dossierId}`);
};
