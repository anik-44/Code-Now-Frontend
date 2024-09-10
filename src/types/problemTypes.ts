export enum Difficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}

export interface Problem {
  id?: number;
  title?: string;
  slug?: string;
  description?: string;
  difficulty?: Difficulty;
}

export interface ProblemDetail extends Problem {
  input: string;
  output: string;
}
