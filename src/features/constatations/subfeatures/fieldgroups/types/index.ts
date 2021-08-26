import { BaseEntity } from "@/types";

export type Constatation = {
  id: string;
  comment: string;
  modelType: null;
  isValidated: string;
  validationDate: string;
  requiresValidation: string;
  requiresValidationDate: string;
  created_at: string;
  updated_at: string;
  field_groups: FieldGroup[];
  localization: Localization;
  dossiers: Dossier[];
  actions: Action[];
  images: Image[];
  observers: Observer[];
} & BaseEntity;

export type Location = {
  id: string;
  title: string;
  body: string;
  teamId: string;
} & BaseEntity;

export type ImageToSend = {
  name: string;
  height: number;
  width: number;
  type: string;
  uri: string;
  base64: string;
} & BaseEntity;

export type Action = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  pivot: ActionPivot;
} & BaseEntity;

export type ActionPivot = {
  constatation_id: string;
  action_id: string;
} & BaseEntity;

export type Dossier = {
  id: string;
  name: string;
  isCurrent: string;
  created_at: string;
  updated_at: string;
  pivot: DossierPivot;
} & BaseEntity;

export type DossierPivot = {
  constatation_id: string;
  dossier_id: string;
} & BaseEntity;

export type FieldGroup = {
  id: string;
  constatation_id: string;
  name: string;
  type: string;
  logical_operator: string;
  created_at: string;
  updated_at: string;
  fields: Field[];
} & BaseEntity;

export type Field = {
  id: string;
  name: string;
  type: string;
  orderedUuid: string;
  value: string;
  isDefault: string;
  field_group_id: string;
  created_at: string;
  updated_at: string;
} & BaseEntity;

export type Image = {
  id: string;
  constatation_id: string;
  name: ImageName;
  created_at: string;
  updated_at: string;
  media: Media[];
} & BaseEntity;

export type Media = {
  id: string;
  model_type: ModelType;
  model_id: string;
  uuid: string;
  name: string;
  file_name: string;
  mime_type: MIMEType;

  size: string;
  manipulations: any[];
  custom_properties: any[];
  generated_conversions: GeneratedConversions;
  responsive_images: any[];
  order_column: string;
  created_at: string;
  updated_at: string;
} & BaseEntity;

export interface GeneratedConversions {
  thumb: boolean;
}

export enum MIMEType {
  ImageJPEG = "image/jpeg",
}

export enum ModelType {
  AppModelsImage = "App\\Models\\Image",
}

export enum ImageName {
  Sample = "sample",
  Test = "test",
}

export interface Localization {
  id: string;
  name: LocalizationName;
  constatation_id: string;
  created_at: string;
  updated_at: string;
  coords: Coordinate;
  address: Address;
}

export interface Address {
  id: string;
  formatted_address: FormattedAddress;
  geometry: null;
  place_id: PlaceID;
  localization_id: string;
  created_at: string;
  updated_at: string;
}

export enum FormattedAddress {
  OcéanIndien = "Océan Indien",
}

export enum PlaceID {
  ChIJH2PCRJNFxgRN5ApY1C1OO = "ChIJH2p_crJNFxgRN5apY1C_1Oo",
}

export interface Coordinate {
  longitude: string;
  latitude: string;
  altitude: null;
  accuracy: null;
  altitudeAccuracy: null;
  heading: null;
  speed: null;
  localization_id: string;
  created_at: string;
  updated_at: string;
}

export enum LocalizationName {
  AtCreation = "at_creation",
}

export interface Observer {
  id: string;
  created_at: string;
  updated_at: string;
  pivot: ObserverPivot;
}

export interface ObserverPivot {
  constatation_id: string;
  observer_id: string;
}
