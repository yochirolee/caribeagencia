import { create } from "zustand";

export const InvoiceStore = create((set) => ({
	// State

	invoice: {
		invoiceNumber: null,
		customer: null,
		reciever: null,
		products: [{}],
	},
	//Actions
}));
