const REPORT_TYPE = {
  STRUCTUAL: "STRUCTUAL",
  GROUND: "GROUND",
  RIVER: "RIVER",
} as const;
type REPORT_TYPE = (typeof REPORT_TYPE)[keyof typeof REPORT_TYPE];

type PersonSurveyor = {
  type: "surveyor";
  uuid: string;
  name: string;
};

type PersonReviewer = {
  type: "reviewer";
  uuid: string;
  name: string;
};

type PersonManager = {
  type: "manager";
  uuid: string;
  name: string;
};

type Person = PersonSurveyor | PersonReviewer | PersonManager;

type UnassignedUnconfirmedReport = {
  type: "unassigned_unconfirmed";
  reportType: REPORT_TYPE;
  uuid: string;
};

type AssignedUnconfirmedReport = {
  type: "assigned_unconfirmed";
  reportType: REPORT_TYPE;
  uuid: string;
  assignedTo: PersonSurveyor;
  assignedAt: string;
  assignedBy: PersonManager;
};

type AssignedConfirmedReport = {
  type: "assigned_confirmed";
  reportType: REPORT_TYPE;
  uuid: string;
  assignedTo: PersonSurveyor;
  assignedAt: string;
  assignedBy: PersonManager;
  date: string;
  confirmedAt: string;
  confirmedBy: PersonManager;
};

type InProgressReport = {
  type: "in_progress";
  reportType: REPORT_TYPE;
  uuid: string;
  assignedTo: PersonSurveyor;
  assignedAt: string;
  assignedBy: PersonManager;
  date: string;
  confirmedAt: string;
  confirmedBy: PersonManager;
  startedAt: string;
};

type AwaitingReviewReport = {
  type: "awaiting_review";
  reportType: REPORT_TYPE;
  uuid: string;
  assignedTo: PersonSurveyor;
  assignedAt: string;
  assignedBy: PersonManager;
  date: string;
  confirmedAt: string;
  confirmedBy: PersonManager;
  startedAt: string;
  endedAt: string;
};

type InReviewReport = {
  type: "in_review";
  reportType: REPORT_TYPE;
  uuid: string;
  assignedTo: PersonSurveyor;
  assignedAt: string;
  assignedBy: PersonManager;
  date: string;
  confirmedAt: string;
  confirmedBy: PersonManager;
  startedAt: string;
  endedAt: string;
  reviewStartedAt: string;
  reviewer: PersonReviewer;
};

type CompletedReport = {
  type: "completed";
  reportType: REPORT_TYPE;
  uuid: string;
  assignedTo: PersonSurveyor;
  assignedAt: string;
  assignedBy: PersonManager;
  date: string;
  confirmedAt: string;
  confirmedBy: PersonManager;
  startedAt: string;
  endedAt: string;
  reviewStartedAt: string;
  reviewer: PersonReviewer;
  reviewEndedAt: string;
  completedAt: string;
};

type Report =
  | UnassignedUnconfirmedReport
  | AssignedUnconfirmedReport
  | AssignedConfirmedReport
  | InProgressReport
  | AwaitingReviewReport
  | InReviewReport
  | CompletedReport;
