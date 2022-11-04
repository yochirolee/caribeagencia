import { React } from "react";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.min.css";

export const CustomersTable = ({ customers }) => {
	return (
		<div className=" w-full text-sm px-10">
			<Grid
				data={customers.map((customer) => {
					return [
						customer.CustomerId,
						customer.FirstName,
						customer.LastName,
						customer.Mobile,
						customer.Address,
						customer.Email,
						customer.Phone,
					];
				})}
				columns={[
					"Id",
					"Nombre",
					"Apellidos",
					"Mobile",
					"Direccion",
					"Email",
					"Telefono",
					"AnoterCol",
				]}
				search={true}
				pagination={{
					enabled: true,
					limit: 25,
				}}
			/>
		</div>
	);
};
