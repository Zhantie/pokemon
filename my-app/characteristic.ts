export interface Root {
  id: number;
  gene_modulo: number;
  possible_values: number[];
  highest_stat: HighestStat;
  descriptions: Description[];
}

export interface HighestStat {
  name: string;
  url: string;
}

export interface Description {
  description: string;
  language: Language;
}

export interface Language {
  name: string;
  url: string;
}
