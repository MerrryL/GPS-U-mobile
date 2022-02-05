export type BaseEntity = {
  id: string;
  created_at: string;
  updated_at: string;
};

export type Constatation = {
  description: string;
  modelType: null;
  isValidated: number;
  validationDate: string;
  requiresValidation: number;
  requiresValidationDate: string;
  updated_at: string;
  field_groups: FieldGroup[];
  localization: Localization;
  dossiers: Dossier[];
  actions: Action[];
  images: Image[];
  observations: Observation[];
  observers: User[];
  media: Media[];
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
  name: string;
  pivot: ActionPivot;
} & BaseEntity;

export type ActionPivot = {
  constatation_id: string;
  action_id: string;
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
  name: string;
  type: string;
  logical_operator: string;
  fields: Field[];
} & BaseEntity;

export type Field = {
  name: string;
  type_id: string;
  type: FieldType;
  options: string;
  defaultValue: string;
  isRequired: boolean;
  field_group_id: string;
  field_group: FieldGroup;
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
  model_type: string;
  model_id: string;
  uuid: string;
  name: string;
  file_name: string;
  mime_type: string;
  size: string;
  manipulations: any[];
  custom_properties: any[];
  generated_conversions: GeneratedConversions;
  responsive_images: any[];
  order_column: string;
} & BaseEntity;

export interface GeneratedConversions {
  thumb: boolean;
}
export type Localization = {
  constatation_id: string;
  accuracy: any;
  address_components: any;
  altitude: any;
  altitudeAccuracy: any;
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
  firstName: string;
  lastName: string;
  email: string;
  role: "ADMIN" | "USER";
  teamId: string;
  bio: string;
} & BaseEntity;

//TODO: Find out what is the best pattern
export type Observer = User;
export type Supervisor = User;
export type Operator = User;

export type Observation = {
  name: string;
  code: string;
  short_description: string;
  description: string;
  fine_amount: string;
  codex: Codex;
  observation_type: ObservationType;
  field_groups: FieldGroup[];
  images: Image[];
} & BaseEntity;

export type ObservationType = {
  name: string;
  description: string;
};

export type Codex = {
  name: string;
  precode: string;
  description: string;
};

export type Followup = {
  name: string;
  description: string;
  followup_status: FollowupStatus;
  observation: Observation;
  supervisor: Supervisor;
  tasks: Task[];
} & BaseEntity;

export type Status = {
  name: string;
} & BaseEntity;

export type FollowupStatus = Status;

export type Task = {
  name: string;
  description: string;
  realisation_date: Date;
  report_date: Date;
  report_periodicity: Date;
  task_status: TaskStatus;
  followup: Followup[];
  operators: Operator[];
};

export type TaskStatus = Status;
