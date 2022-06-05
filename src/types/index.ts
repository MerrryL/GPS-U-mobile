
export type BaseEntity = {
  id: number;
  created_at: string;
  updated_at: string;
};

export type Constatation = {
  description: string;
  field_groups: FieldGroup[];
  images: Image[];
  isValidated: number;
  localization: Localization;
  media: Media[];
  modelType: null;
  observations: Observation[];
  observers: User[];
  requiresValidation: number;
  requiresValidationDate: string;
  updated_at: string;
  validationDate: string;
} & BaseEntity;

export type ImageToSend = {
  base64: string;
  height: number;
  name: string;
  type: string;
  uri: string;
  width: number;
} & BaseEntity;

export type FieldGroup = {
  constatation_id: string;
  description: string;
  fields: Field[];
  name: string;
  title: string;
} & BaseEntity;

export type Field = {
  defaultValue: string;
  field_group_id: string;
  field_group: FieldGroup;
  isRequired: boolean;
  name: string;
  options: string;
  pivot: ConstFieldPivot;
} & BaseEntity;

export type FieldType = {
  name: string;
  value: string;
} & BaseEntity;

export type ConstFieldPivot = {
  constatation_id: string | number | null;
  field_id: string | number | null;
  value: string | number | null;
};

export type Image = {
  constatation_id: string;
  name: string;
  description: string;
  media: Media[];
} & BaseEntity;

export type Media = {
  custom_properties: any[];
  file_name: string;
  generated_conversions: GeneratedConversions;
  manipulations: any[];
  mime_type: string;
  model_id: string;
  model_type: string;
  name: string;
  order_column: string;
  responsive_images: any[];
  size: string;
  uuid: string;
} & BaseEntity;

export interface GeneratedConversions {
  thumb: boolean;
}

export interface Northeast {
    lat: number;
    lng: number;
}

export interface Southwest {
    lat: number;
    lng: number;
}

export interface Viewport {
    northeast: Northeast;
    southwest: Southwest;
}

export interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
}

export type Localization = {
  accuracy?: number | null;
  address_components?: AddressComponent[];
  altitude?:  number | null;
  altitudeAccuracy?: number | null;
  constatation_id?: number;
  formatted_address?: string;
  given_name?: string;
  heading?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  place_id?: number;
  speed?: number | null;
  viewport?: Viewport;
} & Partial<BaseEntity>;

export type User = {
  bio: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "USER";
  teamId: string;
} & BaseEntity;

//TODO: Find out what is the best pattern
export type Observer = User;
export type Supervisor = User;
export type Operator = User;

export interface Observation{
  code: string;
  codex_id: number;
  codex: Codex;
  description: string;
  field_groups: FieldGroup[];
  fine_amount: string;
  image_requests: ImageRequest[];
  name: string;
  observation_type_id: number;
  observation_type: ObservationType;
  short_description: string;
  id: number;
  created_at: string;
  updated_at: string;
}

export interface ImageRequest{
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
}

export type ObservationType = {
  name: string;
  description: string;
} & BaseEntity;

export type Codex = {
  description: string;
  name: string;
  precode: string;
} & BaseEntity;

