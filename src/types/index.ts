export type BaseEntity = {
  id: number;
  created_at: string;
  updated_at: string;
};

export type Constatation = {
  actions: Action[];
  description: string;
  dossiers: Dossier[];
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

export type Action = {
  name: string;
  pivot: ActionPivot;
} & BaseEntity;

export type ActionPivot = {
  action_id: string;
  constatation_id: string;
} & BaseEntity;

export type Dossier = {
  name: string;
  isCurrent: string;
  pivot: DossierPivot;
} & BaseEntity;

export type DossierPivot = {
  constatation_id: string;
  dossier_id: string;
} & BaseEntity;

export type FieldGroup = {
  constatation_id: string;
  description: string;
  fields: Field[];
  logical_operator: string;
  name: string;
  title: string;
  type: string;
} & BaseEntity;

export type Field = {
  defaultValue: string;
  field_group_id: string;
  field_group: FieldGroup;
  isRequired: boolean;
  name: string;
  options: string;
  pivot: ConstFieldPivot;
  type_id: string;
  type: FieldType;
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
export type Localization = {
  accuracy: any;
  address_components: any;
  altitude: any;
  altitudeAccuracy: any;
  constatation_id: string;
  formatted_address: any;
  given_name: string;
  heading: any;
  latitude: number;
  longitude: number;
  place_id: any;
  speed: any;
  viewport: any;
} & BaseEntity;

export type Marker = {
  latitude: number;
  longitude: number;
};

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
  images: Image[];
  name: string;
  observation_type_id: number;
  observation_type: ObservationType;
  short_description: string;
    id: number;
  created_at: string;
  updated_at: string;
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

export type Followup = {
  description: string;
  followup_status: FollowupStatus;
  name: string;
  observation: Observation;
  supervisor: Supervisor;
  tasks: Task[];
} & BaseEntity;

export type Status = {
  name: string;
} & BaseEntity;

export type FollowupStatus = Status;

export type Task = {
  description: string;
  followup: Followup[];
  name: string;
  operators: Operator[];
  realisation_date: Date;
  report_date: Date;
  report_periodicity: Date;
  task_status: TaskStatus;
};

export type TaskStatus = Status;
