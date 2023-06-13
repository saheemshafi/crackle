export interface Cast {
  adult: boolean;
  cast_id?: number;
  character?: string;
  credit_id: string;
  department?: Department;
  gender: number;
  id: number;
  job?: string;
  known_for_department: Department;
  name: string;
  order?: number;
  original_name: string;
  popularity: number;
  profile_path: null | string;
}

export enum Department {
  Acting = "Acting",
  Art = "Art",
  Directing = "Directing",
  Editing = "Editing",
  Production = "Production",
  Sound = "Sound",
  VisualEffects = "Visual Effects",
  Writing = "Writing",
}
