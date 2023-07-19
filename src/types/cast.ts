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
  Editing = "Editing",
  Acting = "Acting",
  Art = "Art",
  Camera = "Camera",
  CostumeMakeUp = "Costume & Make-Up",
  Crew = "Crew",
  Directing = "Directing",
  Production = "Production",
  Sound = "Sound",
  VisualEffects = "Visual Effects",
  Writing = "Writing",
}

export enum Job {
  Animation = "Animation",
  AnimationDirector = "Animation Director",
  ArtDirection = "Art Direction",
  AssistantDirectorOfPhotography = "Assistant Director of Photography",
  BackgroundDesigner = "Background Designer",
  ColorDesigner = "Color Designer",
  CompositingArtist = "Compositing Artist",
  CostumeDesigner = "Costume Designer",
  Director = "Director",
  KeyAnimation = "Key Animation",
  Producer = "Producer",
  ProductionAssistant = "Production Assistant",
  SpecialEffects = "Special Effects",
  StoryboardArtist = "Storyboard Artist",
  SupervisingAnimationDirector = "Supervising Animation Director",
  ThemeSongPerformance = "Theme Song Performance",
  Writer = "Writer",
}
