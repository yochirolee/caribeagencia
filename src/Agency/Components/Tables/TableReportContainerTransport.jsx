import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";



export default function TableReportContainerTransport({ invoices, tableRef }) {
	console.log(invoices,"invoices")
	return (
		<Table ref={tableRef}>
			<TableHead>
				<TableRow className="text-xs">
					<TableHeaderCell>Factura</TableHeaderCell>
					<TableHeaderCell>Contenedor</TableHeaderCell>
					<TableHeaderCell>Agencia</TableHeaderCell>
					<TableHeaderCell>Total Hbl</TableHeaderCell>
					<TableHeaderCell>Hbl</TableHeaderCell>
					<TableHeaderCell>Destinatario</TableHeaderCell>
					<TableHeaderCell>Direccion de Entrega</TableHeaderCell>
					<TableHeaderCell>Telefono</TableHeaderCell>
					<TableHeaderCell>Provincia</TableHeaderCell>
					<TableHeaderCell>Municipio</TableHeaderCell>
					<TableHeaderCell>Con Entrega</TableHeaderCell>
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
						<TableCell>{invoice.ContainerNumber}</TableCell>
						<TableCell>{invoice.AgencyName}</TableCell>
						<TableCell>{invoice.Products.length}</TableCell>
						<TableCell>{invoice?.Products[0]?.HBL}</TableCell>
						<TableCell>{invoice.RecieverName}</TableCell>
						<TableCell>{invoice.RecieverAddress}</TableCell>
						<TableCell>{invoice.Phones}</TableCell>
						<TableCell>{invoice.Provincia}</TableCell>
						<TableCell>{invoice.Municipio}</TableCell>
						<TableCell>{parseFloat(invoice.TotalWeight).toFixed(2) >100 ? "No":"Si"}</TableCell>
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
