export type Languages = "Java" | "Cpp";

export type Selected = "input" | "output";

export interface runCodeArgs {
  slug_id: string;
  code: string;
  input: string;
  language: Languages;
}

export interface submitCodeArgs {
  slug_id: string;
  code: string;
  language: Languages;
}
export enum SubmissionStatus {
  Pending = "Pending",
  Correct = "Correct",
  Wrong = "Wrong",
  Error = "Error",
}

export interface SubmissionData {
  language: string;
  status: SubmissionStatus;
  createdAt: string;
}
