import { Result } from "./core";

export type InvoicePending = {
  uuid: string;
  amount: number;
  state: "pending";
  createdAt: string;
};

export type InvoicePaid = {
  uuid: string;
  amount: number;
  state: "paid";
  createdAt: string;
  paidAt: string;
  paymentMethod: string;
};

export type InvoiceCancelled = {
  uuid: string;
  amount: number;
  state: "cancelled";
  createdAt: string;
  cancelledAt: string;
  cancelledReason: string;
};

type Invoice = InvoicePending | InvoicePaid | InvoiceCancelled;

type DBInvoice = {
  uuid: string;
  amount: number;
  state: "pending" | "paid" | "cancelled";
  createdAt: string;
  paidAt: string | null;
  paymentMethod: string | null;
  cancelledAt: string | null;
  cancelledReason: string | null;
};

enum DBInvoiceParsingError {
  UNKNOWN_STATE = "UNKNOWN_STATE",
  PENDING_INVOICE_HAS_PAID_AT = "PENDING_INVOICE_HAS_PAID_AT",
  PENDING_INVOICE_HAS_PAYMENT_METHOD = "PENDING_INVOICE_HAS_PAYMENT_METHOD",
  PENDING_INVOICE_HAS_CANCELLED_AT = "PENDING_INVOICE_HAS_CANCELLED_AT",
  PENDING_INVOICE_HAS_CANCELLED_REASON = "PENDING_INVOICE_HAS_CANCELLED_REASON",
  PAID_INVOICE_MISSING_PAID_AT = "PAID_INVOICE_MISSING_PAID_AT",
  PAID_INVOICE_MISSING_PAYMENT_METHOD = "PAID_INVOICE_MISSING_PAYMENT_METHOD",
  PAID_INVOICE_HAS_CANCELLED_AT = "PAID_INVOICE_HAS_CANCELLED_AT",
  PAID_INVOICE_HAS_CANCELLED_REASON = "PAID_INVOICE_HAS_CANCELLED_REASON",
  CANCELLED_INVOICE_MISSING_CANCELLED_AT = "CANCELLED_INVOICE_MISSING_CANCELLED_AT",
  CANCELLED_INVOICE_MISSING_CANCELLED_REASON = "CANCELLED_INVOICE_MISSING_CANCELLED_REASON",
  CANCELLED_INVOICE_HAS_PAID_AT = "CANCELLED_INVOICE_HAS_PAID_AT",
  CANCELLED_INVOICE_HAS_PAYMENT_METHOD = "CANCELLED_INVOICE_HAS_PAYMENT_METHOD",
}

function dbInvoiceToInvoice(
  dbInvoice: DBInvoice
): Result<Invoice, DBInvoiceParsingError> {
  switch (dbInvoice.state) {
    case "pending": {
      if (dbInvoice.paidAt !== null) {
        return {
          ok: false,
          error: DBInvoiceParsingError.PENDING_INVOICE_HAS_PAID_AT,
        };
      }
      if (dbInvoice.paymentMethod !== null) {
        return {
          ok: false,
          error: DBInvoiceParsingError.PENDING_INVOICE_HAS_PAYMENT_METHOD,
        };
      }
      if (dbInvoice.cancelledAt !== null) {
        return {
          ok: false,
          error: DBInvoiceParsingError.PENDING_INVOICE_HAS_CANCELLED_AT,
        };
      }
      if (dbInvoice.cancelledReason !== null) {
        return {
          ok: false,
          error: DBInvoiceParsingError.PENDING_INVOICE_HAS_CANCELLED_REASON,
        };
      }

      return {
        ok: true,
        value: {
          uuid: dbInvoice.uuid,
          amount: dbInvoice.amount,
          state: "pending",
          createdAt: dbInvoice.createdAt,
        },
      };
    }
    case "paid": {
      if (dbInvoice.paidAt === null) {
        return {
          ok: false,
          error: DBInvoiceParsingError.PAID_INVOICE_MISSING_PAID_AT,
        };
      }
      if (dbInvoice.paymentMethod === null) {
        return {
          ok: false,
          error: DBInvoiceParsingError.PAID_INVOICE_MISSING_PAYMENT_METHOD,
        };
      }
      if (dbInvoice.cancelledAt !== null) {
        return {
          ok: false,
          error: DBInvoiceParsingError.PAID_INVOICE_HAS_CANCELLED_AT,
        };
      }
      if (dbInvoice.cancelledReason !== null) {
        return {
          ok: false,
          error: DBInvoiceParsingError.PAID_INVOICE_HAS_CANCELLED_REASON,
        };
      }

      return {
        ok: true,
        value: {
          uuid: dbInvoice.uuid,
          amount: dbInvoice.amount,
          state: "paid",
          createdAt: dbInvoice.createdAt,
          paidAt: dbInvoice.paidAt,
          paymentMethod: dbInvoice.paymentMethod,
        },
      };
    }
    case "cancelled": {
      if (dbInvoice.cancelledAt === null) {
        return {
          ok: false,
          error: DBInvoiceParsingError.CANCELLED_INVOICE_MISSING_CANCELLED_AT,
        };
      }
      if (dbInvoice.cancelledReason === null) {
        return {
          ok: false,
          error:
            DBInvoiceParsingError.CANCELLED_INVOICE_MISSING_CANCELLED_REASON,
        };
      }
      if (dbInvoice.paidAt !== null) {
        return {
          ok: false,
          error: DBInvoiceParsingError.CANCELLED_INVOICE_HAS_PAID_AT,
        };
      }
      if (dbInvoice.paymentMethod !== null) {
        return {
          ok: false,
          error: DBInvoiceParsingError.CANCELLED_INVOICE_HAS_PAYMENT_METHOD,
        };
      }
      return {
        ok: true,
        value: {
          uuid: dbInvoice.uuid,
          amount: dbInvoice.amount,
          state: "cancelled",
          createdAt: dbInvoice.createdAt,
          cancelledAt: dbInvoice.cancelledAt,
          cancelledReason: dbInvoice.cancelledReason,
        },
      };
    }
    default:
      return {
        ok: false,
        error: DBInvoiceParsingError.UNKNOWN_STATE,
      };
  }
}
