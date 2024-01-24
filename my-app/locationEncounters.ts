export type LocationAreaEncounters = Root2[];

export interface Root2 {
  location_area: LocationArea;
  version_details: VersionDetail[];
}

export interface LocationArea {
  name: string;
  url: string;
}

export interface VersionDetail {
  encounter_details: EncounterDetail[];
  max_chance: number;
  version: Version;
}

export interface EncounterDetail {
  chance: number;
  condition_values: any[];
  max_level: number;
  method: Method;
  min_level: number;
}

export interface Method {
  name: string;
  url: string;
}

export interface Version {
  name: string;
  url: string;
}
