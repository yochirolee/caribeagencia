import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";

export const salesPeople = [
	{
		name: "Peter Doe",
		leads: 45,
		sales: "1,000,000",
		quota: "1,200,000",
		variance: "low",
		region: "Region A",
		status: "overperforming",
		deltaType: "moderateIncrease",
	},
	{
		name: "Lena Whitehouse",
		leads: 35,
		sales: "900,000",
		quota: "1,000,000",
		variance: "low",
		region: "Region B",
		status: "average",
		deltaType: "unchanged",
	},
	{
		name: "Phil Less",
		leads: 52,
		sales: "930,000",
		quota: "1,000,000",
		variance: "medium",
		region: "Region C",
		status: "underperforming",
		deltaType: "moderateDecrease",
	},
	{
		name: "John Camper",
		leads: 22,
		sales: "390,000",
		quota: "250,000",
		variance: "low",
		region: "Region A",
		status: "overperforming",
		deltaType: "increase",
	},
	{
		name: "Max Balmoore",
		leads: 49,
		sales: "860,000",
		quota: "750,000",
		variance: "low",
		region: "Region B",
		status: "overperforming",
		deltaType: "increase",
	},
	{
		name: "Peter Moore",
		leads: 82,
		sales: "1,460,000",
		quota: "1,500,000",
		variance: "low",
		region: "Region A",
		status: "average",
		deltaType: "unchanged",
	},
	{
		name: "Joe Sachs",
		leads: 49,
		sales: "1,230,000",
		quota: "1,800,000",
		variance: "medium",
		region: "Region B",
		status: "underperforming",
		deltaType: "moderateDecrease",
	},
];

export default function TableReportContainerTransport({ invoices, tableRef }) {
	return (
		<Table ref={tableRef}>
			<TableHead>
				<TableRow className="text-xs">
					<TableHeaderCell>Factura</TableHeaderCell>
					<TableHeaderCell>Agencia</TableHeaderCell>
					<TableHeaderCell>Cant Hbl</TableHeaderCell>
					<TableHeaderCell>Hbl</TableHeaderCell>
					<TableHeaderCell>Destinatario</TableHeaderCell>
					<TableHeaderCell>Telefono</TableHeaderCell>
					<TableHeaderCell>Provincia</TableHeaderCell>
					<TableHeaderCell>Municipio</TableHeaderCell>
					<TableHeaderCell>Peso (Lbs)</TableHeaderCell>
					<TableHeaderCell>Pagar Manipulacion</TableHeaderCell>
					<TableHeaderCell>Pagar Delivery</TableHeaderCell>
					<TableHeaderCell>Pagar SobrePeso</TableHeaderCell>
					<TableHeaderCell>Delivery Cobrado</TableHeaderCell>
					<TableHeaderCell>Total</TableHeaderCell>
				</TableRow>
			</TableHead>

			<TableBody className="text-xs">
				{invoices.map((invoice) => (
					<TableRow key={invoices.InvoiceId}>
						<TableCell>{invoice.InvoiceId}</TableCell>
						<TableCell>{invoice.AgencyName}</TableCell>
						<TableCell>{invoice.Products.length}</TableCell>
						<TableCell>{invoice?.Products[0]?.HBL}</TableCell>
						<TableCell>{invoice.RecieverName}</TableCell>
						<TableCell>{invoice.Phones}</TableCell>
						<TableCell>{invoice.Provincia}</TableCell>
						<TableCell>{invoice.Municipio}</TableCell>
						<TableCell>{parseFloat(invoice.TotalWeight).toFixed(2)}</TableCell>
						<TableCell>{invoice.DeliveryByHandling}</TableCell>
						<TableCell>{invoice.DeliveryByLocation}</TableCell>
						<TableCell>{parseFloat(invoice.DeliveryByOverWeight).toFixed(2)}</TableCell>
						<TableCell>{parseFloat(invoice.Delivery).toFixed(2)}</TableCell>
						<TableCell>
							{parseFloat(
								invoice.DeliveryByLocation +
									invoice.DeliveryByOverWeight +
									invoice.DeliveryByHandling,
							).toFixed(2)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
