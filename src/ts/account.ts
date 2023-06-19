import { InvoiceCancelled, InvoicePaid, InvoicePending } from "./dbInvoice";

type AccountSignup = {
  uuid: string;
  state: "signup";
  email: string;
};

type AccountTrial = {
  uuid: string;
  state: "trial";
  email: string;
  password: string;
  trialStartAt: string;
  trialEndsAt: string;
  paymentMethod: string;
};

type AccountActive = {
  uuid: string;
  state: "active";
  email: string;
  password: string;
  paymentMethod: string;
  currentInvoice: InvoicePending | InvoicePaid;
};

type AccountCancelled = {
  uuid: string;
  state: "cancelled";
  email: string;
  password: string;
  currentInvoice: InvoiceCancelled;
  cancelledAt: string;
  cancelledReason: string;
};

type Account = AccountSignup | AccountTrial | AccountActive | AccountCancelled;
