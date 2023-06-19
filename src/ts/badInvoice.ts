type BadInvoice = {
    uuid: string;
    amount: number;
    state: 'pending' | 'paid' | 'cancelled'
    createdAt: string;
    paidAt: string | null;
    paymentMethod: string | null;
    cancelledAt: string | null;
    cancelledReason: string | null;
}

const goodState: BadInvoice = {
    uuid: '123',
    amount: 100,
    state: 'paid',
    createdAt: '2020-01-01',
    paidAt: '2020-01-03',
    paymentMethod: null,
    cancelledAt: null,
    cancelledReason: null,
}

const badState: BadInvoice = {
    uuid: '123',
    amount: 100,
    state: 'pending',
    createdAt: '2020-01-01',
    paidAt: '2020-01-03',
    paymentMethod: null,
    cancelledAt: null,
    cancelledReason: null,
}

function payBadInvoice(invoice: BadInvoice, payment_method: string): BadInvoice {
    if (invoice.state !== 'pending') {
        throw new Error('Invoice is not pending');
    }

    if (invoice.cancelledAt !== null || invoice.cancelledReason !== null) {
        throw new Error('Invoice is canceled');
    }

    if (invoice.paidAt !== null || invoice.paymentMethod !== null) {
        throw new Error('Invoice is already paid');
    }

    const newInvoice: BadInvoice = {
        ...invoice,
        state: 'paid',
        paymentMethod: payment_method,
    }

    return newInvoice;
}