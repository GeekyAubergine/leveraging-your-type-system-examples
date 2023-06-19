type GoodInvoicePending = {
  uuid: string;
  amount: number;
  state: "pending";
  createdAt: string;
};

type GoodInvoicePaid = {
  uuid: string;
  amount: number;
  state: "paid";
  createdAt: string;
  paidAt: string;
  paymentMethod: string;
};

type GoodInvoiceCancelled = {
  uuid: string;
  amount: number;
  state: "cancelled";
  createdAt: string;
  cancelledAt: string;
  cancelledReason: string;
};

type GoodInvoice = GoodInvoicePending | GoodInvoicePaid | GoodInvoiceCancelled;

function payGoodInvoiceGeneric(
  invoice: GoodInvoice,
  paymentMethod: string
): GoodInvoice {
  if (invoice.state !== "pending") {
    throw new Error("Invoice is not pending");
  }

  const newInvoice: GoodInvoice = {
    ...invoice,
    state: "paid",
    paymentMethod,
    paidAt: new Date().toISOString(),
  };

  return newInvoice;
}

function payGoodInvoice(
  invoice: GoodInvoicePending,
  paymentMethod: string
): GoodInvoicePaid {
  const newInvoice: GoodInvoicePaid = {
    ...invoice,
    state: "paid",
    paymentMethod,
    paidAt: new Date().toISOString(),
  };

  return newInvoice;
}
