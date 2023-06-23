import { exhaust } from "./core";

type ReportA = {
  type: "A";
  a: string;
};

type ReportB = {
  type: "B";
  b: string;
};

type ReportC = {
  type: "C";
  c: string;
};

type Report = ReportA | ReportB | ReportC;

function processReport(report: Report) {
  switch (report.type) {
    case "A":
      console.log(report.a);
      break;
    case "B":
      console.log(report.b);
      break;
    default:
      exhaust(report);
  }
}
